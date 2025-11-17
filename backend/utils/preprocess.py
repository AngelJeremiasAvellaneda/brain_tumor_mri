import numpy as np
from tensorflow.keras.preprocessing import image

IMG_SIZE = (224, 224)

def preprocess_image(img_path):
    """Carga y prepara una imagen para el modelo."""
    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img) / 255.0
    return np.expand_dims(img_array, axis=0)
