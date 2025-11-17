import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

# ----------------------------
# 1️⃣ Configuración
# ----------------------------
MODEL_PATH = "models/brain_tumor_model_efficientnet.keras"
CLASS_NAMES = ["notumor", "glioma", "meningioma", "pituitary"]
IMG_SIZE = (224, 224)
THRESHOLD = 0.2  # Umbral para considerar tumor aunque 'notumor' sea el máximo

# ----------------------------
# 2️⃣ Cargar modelo
# ----------------------------
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"No se encontró el modelo en {MODEL_PATH}")
model = load_model(MODEL_PATH)
print(f"✅ Modelo cargado desde {MODEL_PATH}")

# ----------------------------
# 3️⃣ Función para preparar imagen
# ----------------------------
def load_and_prepare(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# ----------------------------
# 4️⃣ Función para predecir
# ----------------------------
def predict_brain_tumor(img_path, threshold=THRESHOLD):
    x = load_and_prepare(img_path)
    preds = model.predict(x)[0]

    max_idx = np.argmax(preds)
    # Si 'notumor' es máximo, pero otra clase supera el umbral
    if max_idx == 0:
        for i in range(1, len(preds)):
            if preds[i] > threshold:
                max_idx = i
                break

    print("\n🔹 Predicción final:", CLASS_NAMES[max_idx])
    print("🔹 Probabilidades:")
    for cname, prob in zip(CLASS_NAMES, preds):
        print(f"   {cname}: {prob:.4f}")

# ----------------------------
# 5️⃣ Ejecutar predicción
# ----------------------------
if __name__ == "__main__":
    img_path = input("Ingresa la ruta de la imagen: ").strip()
    if not os.path.exists(img_path):
        print("❌ Ruta de imagen no válida")
    else:
        predict_brain_tumor(img_path)
