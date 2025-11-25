import numpy as np
import onnxruntime as ort
from PIL import Image
import os

# ============================
# CONFIGURACIÓN MODELO
# ============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../models/lungs_xray_model.onnx")

CLASSES = ["COVID", "NORMAL", "NEUMONIA"]
IMG_SIZE = (180, 180)

# Verificar modelo
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"❌ Modelo no encontrado en: {MODEL_PATH}")

# Cargar modelo
print("🔁 Cargando modelo ONNX Pulmones...")
session = ort.InferenceSession(MODEL_PATH)
print("✔ Modelo Pulmones cargado correctamente.")

# ============================
# FUNCIONES
# ============================
def preprocess_lungs(img_path):
    img = Image.open(img_path).convert("RGB")
    img = img.resize(IMG_SIZE)
    array = np.array(img).astype("float32") / 255.0
    return np.expand_dims(array, 0)

def predict_lungs(img_path):
    img = preprocess_lungs(img_path)
    input_name = session.get_inputs()[0].name
    output_name = session.get_outputs()[0].name
    preds = session.run([output_name], {input_name: img})[0][0]

    return {
        "prediction": CLASSES[int(np.argmax(preds))],
        "confidence": float(np.max(preds)),
        "probabilities": {c: float(p) for c, p in zip(CLASSES, preds)}
    }
