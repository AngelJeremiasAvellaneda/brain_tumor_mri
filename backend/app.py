from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid
import uvicorn

# Importar funciones de predicción
from utils.predictor_tumor import predict_tumor
from utils.predictor_lungs import predict_lungs

# ============================
# CONFIGURAR APP FASTAPI
# ============================
app = FastAPI(
    title="API IA Radiografías y MRI",
    description="API para detección de tumores cerebrales y enfermedades pulmonares usando IA",
    version="1.0.0"
)

# CORS (Permitir peticiones desde React u otros frontends)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# CONFIGURAR RUTAS Y CARPETAS
# ============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Carpeta para subir imágenes temporalmente
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Carpeta donde se guardarán los modelos
MODEL_FOLDER = os.path.join(BASE_DIR, "models")
os.makedirs(MODEL_FOLDER, exist_ok=True)

# ============================
# RUTAS
# ============================
@app.get("/")
def home():
    return {"message": "API de IA funcionando correctamente ✔"}

# ----------- TUMOR CEREBRAL -------------
@app.post("/predict/tumor")
async def detect_brain_tumor(image: UploadFile = File(...)):
    try:
        unique_filename = f"{uuid.uuid4().hex}_{image.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        
        # Guardar archivo temporalmente
        with open(file_path, "wb") as f:
            f.write(await image.read())

        # Predecir
        result = predict_tumor(file_path)

        return {"filename": unique_filename, "result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en predicción de tumor: {str(e)}")

# ----------- RADIOGRAFÍA PULMONAR -------------
@app.post("/predict/lungs")
async def detect_lungs(image: UploadFile = File(...)):
    try:
        unique_filename = f"{uuid.uuid4().hex}_{image.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        
        with open(file_path, "wb") as f:
            f.write(await image.read())

        result = predict_lungs(file_path)

        return {"filename": unique_filename, "result": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en predicción pulmonar: {str(e)}")

# ============================
# EJECUTAR DIRECTAMENTE CON PYTHON
# ============================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run("backend.app:app", host="0.0.0.0", port=port)
