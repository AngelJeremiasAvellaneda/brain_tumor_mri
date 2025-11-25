# Brain Tumor & Pulmonary Disease Detection AI – Backend

**Autor:** Angel Jeremías Avellaneda

Este backend en **Python** está diseñado para la detección de **tumores cerebrales** y **enfermedades crónicas pulmonares** usando **imágenes médicas** (MRI y radiografías de tórax). Proporciona la lógica de predicción, preprocesamiento y comunicación con el frontend.

---

## 🔹 Tecnologías utilizadas

* Python 3.11+
* FastAPI
* Uvicorn (servidor ASGI)
* TensorFlow / Keras
* PyTorch
* OpenCV
* scikit-learn, numpy, pandas, Pillow
* Flask (solo para utilidades internas)
* CORS

---

## 🔹 Estructura del backend

```
backend/
├─ __pycache__/                  
├─ models/                        # Contiene modelos de IA
│  ├─ lungs_xray_model.h5         # Modelo activo para enfermedades pulmonares
│  ├─ tumor_xray_model_efficientnet.keras # Modelo activo para tumores cerebrales
│  ├─ brainTumor.keras            # Modelos de prueba históricos
│  ├─ brainTumor.pt               # Modelos de prueba históricos
│  └─ Vbai_TS_2_4.pt              # Modelos de prueba históricos
├─ static/                        # Imágenes de prueba para el proyecto
├─ uploads/                       # Imágenes subidas por los usuarios
├─ utils/                         
│  ├─ imagenet_class_index.json   # Para futuros modelos de clasificación de otro tipo de imagen
│  ├─ predictor_lungs.py          # Funciones de predicción pulmonar
│  ├─ predictor_tumor.py          # Funciones de predicción de tumores cerebrales
│  └─ preprocess.py               # Preprocesamiento de imágenes
├─ app.py                         # Lógica principal: rutas, predicción y conexión con frontend
└─ README.md
```

---

## 🔹 Funcionamiento

1. El usuario sube imágenes médicas al endpoint correspondiente (`uploads/`).
2. Las imágenes son preprocesadas mediante `preprocess.py`.
3. Dependiendo del tipo de imagen, se utilizan los modelos:

   * `predictor_tumor.py` → tumores cerebrales
   * `predictor_lungs.py` → enfermedades pulmonares
4. El resultado se devuelve al frontend para su visualización.
5. Se pueden usar imágenes de prueba almacenadas en `static/`.

**Nota:** Solo los modelos `lungs_xray_model.h5` y `tumor_xray_model_efficientnet.keras` están activos para este proyecto; los demás son históricos o de prueba.

---

## 🔹 Ejecución del servidor

```bash
cd backend
python -m venv env
env\Scripts\activate       # Windows
# source env/bin/activate  # Linux/macOS
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 5000
```

El backend quedará disponible en `http://localhost:5000`.

---

## 🔹 Observaciones

* `uploads/` almacena imágenes subidas por usuarios.
* `static/` contiene imágenes de prueba; se puede renombrar a `sample_images/` si se desea mayor claridad.
* `imagenet_class_index.json` está destinado para desarrollos futuros de clasificación de otro tipo de imágenes.
* Toda la lógica de rutas y llamadas a modelos está centralizada en `app.py`.
