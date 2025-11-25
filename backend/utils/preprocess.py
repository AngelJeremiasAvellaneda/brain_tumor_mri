import numpy as np
from PIL import Image

IMG_SIZE = (224, 224)

def preprocess_image(img_path):
    """Carga y prepara una imagen para el modelo ONNX."""
    img = Image.open(img_path).convert("RGB")
    img = img.resize(IMG_SIZE)
    img_array = np.array(img).astype("float32") / 255.0
    return np.expand_dims(img_array, axis=0)
