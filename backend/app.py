from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.predictor import predict_tumor

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return {"message": "API de detección de tumores funcionando ✔"}

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No se envió una imagen"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "Nombre de archivo vacío"}), 400

    save_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(save_path)

    result = predict_tumor(save_path)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
