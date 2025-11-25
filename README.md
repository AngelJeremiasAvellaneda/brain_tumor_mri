¡Perfecto! Con toda la información que me diste, puedo armar un **README completo para tu proyecto “Brain Tumor & Pulmonary Disease Detection AI”**, combinando backend y frontend, con tu autoría y detalles de tecnologías y estructura.

---

# Brain Tumor & Pulmonary Disease Detection AI

**Autor:** Angel Jeremías Avellaneda

Este proyecto combina **backend en Python (FastAPI / Flask)** y **frontend en React** para la detección de **tumores cerebrales** y **enfermedades pulmonares** usando imágenes médicas (MRI y radiografías de tórax). Permite subir imágenes desde la interfaz web, procesarlas en el backend mediante modelos de Machine Learning, y mostrar los resultados de forma interactiva y visual.

---

## 🔹 Tecnologías usadas

### Backend

* Python 3.11+
* FastAPI / Flask
* TensorFlow / Keras
* PyTorch
* NumPy, Pandas, OpenCV
* Uvicorn (servidor ASGI)
* scikit-learn, Pillow, Matplotlib
* Python-dotenv

### Frontend

* React 19
* React Router DOM 7
* Axios
* TailwindCSS
* Vite (bundler)
* @tensorflow/tfjs
* MUI Icons, Lucide React
* PostCSS, Autoprefixer

---

## 🔹 Estructura del proyecto

```
brain_tumor_mri/
├─ .vscode/                        # Configuración de VSCode
├─ backend/                        # Backend en Python
│  ├─ __pycache__/
│  ├─ models/                      # Modelos de Machine Learning
│  │  ├─ lungs_xray_model.h5       # Modelo usado para pulmones
│  │  └─ tumor_xray_model_efficientnet.keras # Modelo usado para tumores
│  │  └─ otros modelos de prueba (no usados)
│  ├─ static/assets/               # Imágenes de prueba
│  ├─ uploads/                     # Imágenes subidas por el usuario
│  ├─ utils/
│  │  ├─ imagenet_class_index.json # En proceso para futuros modelos
│  │  ├─ predictor_lungs.py        # Predicción pulmones
│  │  ├─ predictor_tumor.py        # Predicción tumores
│  │  └─ preprocess.py             # Preprocesamiento de imágenes
│  ├─ app.py                        # Lógica principal, rutas y conexión frontend
│  └─ README.md
├─ frontend/                        # Frontend en React
│  ├─ node_modules/                 # Dependencias NPM
│  ├─ public/                       # Archivos estáticos
│  ├─ src/
│  │  ├─ api/                       # Axios client
│  │  ├─ assets/                     # Recursos (SVG, imágenes)
│  │  ├─ components/                 # Componentes reutilizables
│  │  ├─ pages/                      # Páginas principales
│  │  ├─ utils/                      # Funciones auxiliares
│  │  ├─ App.jsx                      # Componente principal
│  │  └─ main.jsx                     # Entrada de React
│  ├─ package.json
│  ├─ tailwind.config.js
│  ├─ vite.config.js
│  └─ README.md
├─ training/                        # Scripts de entrenamiento
├─ database/                        # Base de datos (si aplica)
└─ requirements.txt                 # Dependencias Python
```

---

## 🔹 Funcionamiento

1. **Subida de imagen:** El usuario sube una imagen médica mediante la interfaz React (`UploadForm.jsx`).
2. **Envío al backend:** Axios se encarga de enviar la imagen al backend (`axiosClient.js`).
3. **Procesamiento:**

   * Backend preprocesa la imagen (`preprocess.py`).
   * Se ejecuta la predicción usando los modelos activos (`predictor_lungs.py` y `predictor_tumor.py`).
4. **Resultado:**

   * El resultado se envía al frontend.
   * `ResultCard` y `Recommendations` muestran la predicción y recomendaciones al usuario.
5. **Ejecutar backend:**

```bash
cd backend
uvicorn app:app --host 0.0.0.0 --port 5000 --reload
```

6. **Ejecutar frontend:**

```bash
cd frontend
npm install
npm run dev
```

* Frontend disponible en `http://localhost:5173`

---

## 🔹 Observaciones

* Solo los modelos `lungs_xray_model.h5` y `tumor_xray_model_efficientnet.keras` se usan en producción; los demás modelos en `models/` son pruebas.
* Las imágenes en `backend/static/assets` son de prueba y pueden renombrarse según necesidades.
* `imagenet_class_index.json` está preparado para futuros modelos de validación de otros tipos de imágenes.
* La estructura modular de React y Python facilita agregar nuevas funcionalidades y modelos en el futuro.

---

## 🔹 Autoría

**Angel Jeremías Avellaneda**

Proyecto desarrollado como prueba y demostración de **detección de tumores cerebrales y enfermedades pulmonares mediante inteligencia artificial**.

---

Si quieres, puedo además hacer **una versión más “GitHub friendly”**, con badges de dependencias, Python y Node, e instrucciones de instalación resumidas para que quede listo para subir al repositorio.

¿Quieres que haga esa versión también?
