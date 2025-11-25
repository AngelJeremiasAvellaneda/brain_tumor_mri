from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid
import uvicorn 

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

# CORS (Permitir peticiones desde React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carpeta para subir imágenes
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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
        # Crear un nombre único para la imagen
        unique_filename = f"{uuid.uuid4().hex}_{image.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        
        # Guardar archivo
        with open(file_path, "wb") as f:
            f.write(await image.read())

        # Predecir usando el modelo
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
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)
