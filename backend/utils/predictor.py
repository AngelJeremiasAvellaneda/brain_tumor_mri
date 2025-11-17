import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import os

# ----------------------------
# CONFIGURACIÓN GLOBAL
# ----------------------------
MODEL_PATH = "models/brain_tumor_model_efficientnet.keras"
CLASS_NAMES = ["notumor", "glioma", "meningioma", "pituitary"]
IMG_SIZE = (224, 224)
THRESHOLD = 0.20  # Anti falso-negativo

# ----------------------------
# CARGA DEL MODELO (UNA VEZ)
# ----------------------------
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"❌ No existe el modelo en: {MODEL_PATH}")

print("🔁 Cargando modelo de tumores cerebrales...")
model = load_model(MODEL_PATH)
print("✅ Modelo cargado correctamente.\n")


# ----------------------------
# PREPROCESAMIENTO
# ----------------------------
def preprocess_image(img_path):
    """Carga y prepara la imagen para el modelo."""
    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img) / 255.0  # normalización correcta
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


# ----------------------------
# PREDICCIÓN
# ----------------------------
def predict_tumor(img_path):
    """Realiza la predicción y aplica reglas anti-falso negativo."""
    x = preprocess_image(img_path)
    preds = model.predict(x)[0]

    max_idx = np.argmax(preds)

    # Si la red dice "notumor" pero otro supera el umbral, lo elegimos
    if max_idx == 0:
        for i in range(1, len(preds)):
            if preds[i] > THRESHOLD:
                max_idx = i
                break

    return {
        "prediction": CLASS_NAMES[max_idx],
        "confidence": float(preds[max_idx]),
        "probabilities": {c: float(p) for c, p in zip(CLASS_NAMES, preds)}
    }
