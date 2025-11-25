import numpy as np
import tensorflow as tf
from PIL import Image
import os
from urllib.request import urlretrieve

# ============================
# CONFIGURACIÓN MODELO
# ============================
MODEL_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../models")
os.makedirs(MODEL_FOLDER, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_FOLDER, "lungs_xray_model.h5")
MODEL_URL = "https://huggingface.co/angeljeremias/lungs_xray_model/resolve/main/lungs_xray_model.h5"

CLASSES = ["COVID", "NORMAL", "NEUMONIA"]
IMG_SIZE = (180, 180)

# Descargar modelo si no existe
if not os.path.exists(MODEL_PATH):
    print("Descargando modelo Pulmones desde Hugging Face...")
    urlretrieve(MODEL_URL, MODEL_PATH)
    print("✔ Modelo Pulmones descargado correctamente.")

# Cargar modelo
print("Cargando modelo de Rayos X pulmonares...")
model = tf.keras.models.load_model(MODEL_PATH)
print("✔Modelo Pulmones cargado correctamente.")

# ============================
# FUNCIONES
# ============================
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
