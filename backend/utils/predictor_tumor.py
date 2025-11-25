import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import os

MODEL_PATH = "backend/models/tumor_xray_model_efficientnet.keras"
CLASS_NAMES = ["notumor", "glioma", "meningioma", "pituitary"]
IMG_SIZE = (224, 224)

THRESHOLD = 0.20
MIN_CONFIDENCE = 0.40

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"No existe el modelo en: {MODEL_PATH}")

print("🔁 Cargando modelo Tumores Brain MRI...")
model = load_model(MODEL_PATH)
print("✔ Modelo Tumores cargado correctamente.\n")

def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

def predict_tumor(img_path):
    x = preprocess_image(img_path)
    preds = model.predict(x)[0]

    max_idx = np.argmax(preds)
    max_prob = preds[max_idx]

    # Anti falso-negativo (si marca "notumor" pero hay sospecha)
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
