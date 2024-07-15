from flask import Flask, request, jsonify
import numpy as np
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename
from flask_cors import CORS

# Define the Flask app
app = Flask(__name__)

CORS(app)

# Load the model
model = load_model(r'./coffee.h5')

def model_predict(img_path, model):
    test_image = image.load_img(img_path, target_size=(224, 224))
    test_image = image.img_to_array(test_image)
    test_image = test_image / 255
    test_image = np.expand_dims(test_image, axis=0)
    result = model.predict(test_image)
    return result

@app.route('/predict', methods=['POST'])
def upload():
    try:
        # Check if the POST request has the file part
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        f = request.files['file']

        # If the user does not select a file, the browser may submit an empty part without filename
        if f.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Create the uploads folder if it doesn't exist
        basepath = os.path.dirname(__file__)
        upload_folder = os.path.join(basepath, 'uploads')
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        # Save the file to uploads folder
        file_path = os.path.join(upload_folder, secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        result = model_predict(file_path, model)

        categories = ['Cercospora', 'Healthy', 'Miner', 'Rust']

        # Process your result for human
        pred_class = result.argmax()

        # Convert numpy int64 to native Python int
        pred_class = int(pred_class)

        output = categories[pred_class]

        # If image path has 'img' or 'IMG', it's not a leaf
        if 'img' in file_path.lower():
            output = 'Not a leaf'

        # Cleanup: remove the uploaded file after prediction
        os.remove(file_path)

        # Return the result as JSON
        return jsonify({
            "disease": pred_class,
            "disease_name": output,
        })

    except Exception as e:
        # Log the error and return a 500 response with the error message
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
