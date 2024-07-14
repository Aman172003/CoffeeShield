import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Crop = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);
  const [diseaseName, setDiseaseName] = useState(null);
  const [cause, setCause] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const fileSelectedHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileUrl(URL.createObjectURL(file));
  };

  const fileUploadHandler = async () => {
    if (!selectedFile) {
      return;
    }

    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);

    try {
      const res = await axios.post(
        'https://coffeeshield.onrender.com/predict',
        fd
      );
      console.log(res.data);
      setDiseaseName(res.data.disease_name);
      setData({
        disease: res.data.disease,
        disease_name: diseaseName,
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const apiKey = 'AIzaSyCv1rbjVBQv0wQtI29YXpaxHSq7qqa2Hg0';
  // Initialize the GoogleGenerativeAI client correctly
  const genAI = new GoogleGenerativeAI(apiKey);

  const knowReason = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Ensure you're using the correct method for generating content
      const prompt = `List out some of the causes for disease ${diseaseName} in the coffee plant`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      text = text.replace(/\*/g, '');
      setCause(text);
    } catch (error) {
      console.error('Error getting the reason from Gemini', error);
    }
  };

  return (
    <div className="about_us">
      <h2 style={{ color: 'black' }} className="text-center">
        Detect disease and Know the root cause
      </h2>
      <div className="mission">
        <span>Doubt of Plant Disease?</span>
        <p>
          We use artificial intelligence to predict the crop disease that can
          degrade agricultural output. Upload the plant image to be scanned by
          our machine learning model and get information about plant disease and
          causes.
        </p>
        <br />
        <div className="text-center">
          <label
            htmlFor="file-upload"
            className="custom-file-upload btn btn-primary rounded-button"
          >
            <i className="fa fa-cloud-upload"></i> Upload Plant Image
          </label>

          <input id="file-upload" type="file" onChange={fileSelectedHandler} />
          {selectedFile ? selectedFile.name : null}
        </div>
        <br />
        <div className="text-center">
          <Button variant="success" onClick={fileUploadHandler}>
            Submit
          </Button>
        </div>
      </div>
      {data && (
        <Card
          style={{
            width: '60%',
            margin: 'auto',
            marginTop: '40px',
          }}
        >
          <Card.Img variant="top" src={fileUrl} height="300" width="300" />
          <Card.Body>
            <h2>Disease: {diseaseName !== 'Healthy' ? 'true' : 'false'}</h2>
            {diseaseName && (
              <h2>
                {diseaseName !== 'Healthy'
                  ? `Disease Name: ${diseaseName}`
                  : 'Healthy'}
              </h2>
            )}
            {diseaseName !== 'Healthy' && (
              <div className="text-center">
                <Button variant="success" onClick={knowReason}>
                  Click here to know the reason
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
      <br />

      {cause && (
        <Card
          style={{
            width: '60%',
            margin: 'auto',
            marginTop: '40px',
          }}
        >
          <Card.Body>
            <div>
              <h2 className="text-center">Causes of {diseaseName}</h2>
              <p>
                {cause.split('\n').map((line, index) => (
                  <li style={{ marginTop: '5px' }} key={index}>
                    {line}
                  </li>
                ))}
              </p>
            </div>
          </Card.Body>
        </Card>
      )}
      <br />
    </div>
  );
};

export default Crop;
