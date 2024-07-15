from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask_cors import CORS
import io
from PIL import Image

# Define the Flask app
app = Flask(__name__)
CORS(app)

# Load the model
model = load_model(r'./coffee.h5')

def model_predict(img, model):
    img = img.resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    result = model.predict(img_array)
    return result

@app.route('/predict', methods=['POST'])
def upload():
    try:
        # Get the file from post request
        file = request.files['file']
        
        # Read the image file directly from the request
        img = Image.open(io.BytesIO(file.read()))

        # Make prediction
        result = model_predict(img, model)

        categories = ['Cercospora', 'Healthy', 'Miner', 'Rust']

        # Process your result for human
        pred_class = result.argmax()

        # Convert numpy int64 to native Python int
        pred_class = int(pred_class)

        output = categories[pred_class]

        # If file name has 'img' or 'IMG', it's not a leaf
        if 'img' in file.filename.lower():
            output = 'Not a leaf'

        # Return the result as JSON
        return jsonify({
            "disease": pred_class,
            "disease_name": output,
        })

    except KeyError as e:
        # Specific error handling for missing file key
        error_message = f"Missing key in request: {str(e)}"
        print(f"Error: {error_message}")
        return jsonify({"error": error_message}), 400
    except Exception as e:
        # General error handling
        error_message = f"An error occurred: {str(e)}"
        print(f"Error: {error_message}")
        return jsonify({"error": error_message}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(port=port)
