import numpy as np
import tensorflow as tf
from PIL import Image
import os

MODEL_PATH = "backend/models/lungs_xray_model.h5"
CLASSES = ["COVID", "NORMAL", "NEUMONIA"]
IMG_SIZE = (180, 180)

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"No existe el modelo en: {MODEL_PATH}")

print("Cargando modelo de Rayos X pulmonares...")
model = tf.keras.models.load_model(MODEL_PATH)
print("✔Modelo Pulmones cargado correctamente.")

def preprocess_lungs(img_path):
    img = Image.open(img_path).convert("RGB")
    img = img.resize(IMG_SIZE)
    array = np.array(img) / 255.0
    return np.expand_dims(array, 0)

def predict_lungs(img_path):
    img = preprocess_lungs(img_path)
    preds = model.predict(img)[0]

    return {
        "prediction": CLASSES[int(np.argmax(preds))],
        "confidence": float(np.max(preds)),
        "probabilities": {c: float(p) for c, p in zip(CLASSES, preds)}
    }
