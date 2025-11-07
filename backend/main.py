# backend/main.py
from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import shutil
from pathlib import Path

from database import get_db, init_db
from services.tramite_service import process_new_tramite, get_tramite_by_id, get_all_tramites

app = FastAPI(title="API Municipalidad Provincial de Yau")

# CORS para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.on_event("startup")
def startup_event():
    """Inicializar base de datos al arrancar"""
    print("[INFO] Inicializando base de datos...")
    init_db()
    print("[INFO] Base de datos lista")

@app.get("/")
def root():
    return {"message": "API Municipalidad - Sistema de Trámites con IA"}

@app.post("/api/v1/tramites")
async def create_tramite(
    file: UploadFile = File(...),
    email: str = Form(...),
    tipo_solicitud: str = Form("general"),
    db: Session = Depends(get_db)
):
    """Endpoint para subir nuevo trámite"""
    
    # Validar extensión
    allowed_extensions = {".pdf", ".jpg", ".jpeg", ".png"}
    file_ext = Path(file.filename).suffix.lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(400, f"Formato no soportado: {file_ext}")
    
    # Guardar archivo
    file_path = UPLOAD_DIR / f"{email}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Procesar trámite
    result = process_new_tramite(
        db=db,
        file_path=str(file_path),
        citizen_email=email,
        request_type=tipo_solicitud
    )
    
    if "error" in result:
        raise HTTPException(500, result["error"])
    
    return result

@app.get("/api/v1/tramites/{tramite_id}")
def get_tramite(tramite_id: str, db: Session = Depends(get_db)):
    """Consultar estado de un trámite"""
    tramite = get_tramite_by_id(db, tramite_id)
    
    if not tramite:
        raise HTTPException(404, "Trámite no encontrado")
    
    return tramite.to_dict()

@app.get("/api/v1/tramites")
def list_tramites(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Listar todos los trámites (para dashboard admin)"""
    tramites = get_all_tramites(db, skip, limit)
    return [t.to_dict() for t in tramites]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
