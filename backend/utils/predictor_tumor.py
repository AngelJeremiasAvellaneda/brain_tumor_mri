from PIL import Image
import numpy as np
import onnxruntime as ort
import os

# ============================
# CONFIGURACIÓN MODELO
# ============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../models/tumor_xray_model_efficientnet.onnx")

CLASS_NAMES = ["notumor", "glioma", "meningioma", "pituitary"]
IMG_SIZE = (224, 224)
THRESHOLD = 0.20
MIN_CONFIDENCE = 0.40

# Verificar modelo
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"❌ Modelo no encontrado en: {MODEL_PATH}")

# Cargar modelo
print("🔁 Cargando modelo ONNX Tumores Brain MRI...")
session = ort.InferenceSession(MODEL_PATH)
print("✔ Modelo Tumores cargado correctamente.\n")

# ============================
# FUNCIONES
# ============================
def preprocess_image(img_path):
    img = Image.open(img_path).convert("RGB")
    img = img.resize(IMG_SIZE)
    img_array = np.array(img).astype("float32") / 255.0
    return np.expand_dims(img_array, 0)

def predict_tumor(img_path):
    x = preprocess_image(img_path)
    input_name = session.get_inputs()[0].name
    output_name = session.get_outputs()[0].name
    preds = session.run([output_name], {input_name: x})[0][0]

    max_idx = np.argmax(preds)
    max_prob = preds[max_idx]

    # Anti falso-negativo
    if max_idx == 0:
        for i in range(1, len(preds)):
            if preds[i] > THRESHOLD:
                max_idx = i
                max_prob = preds[i]
                break

    # Baja confianza
    if max_prob < MIN_CONFIDENCE:
        return {
            "prediction": "uncertain",
            "confidence": float(max_prob),
            "probabilities": {c: float(p) for c, p in zip(CLASS_NAMES, preds)}
        }

    return {
        "prediction": CLASS_NAMES[max_idx],
        "confidence": float(max_prob),
        "probabilities": {c: float(p) for c, p in zip(CLASS_NAMES, preds)}
    }
