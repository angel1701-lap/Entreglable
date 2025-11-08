# backend/services/tramite_service.py
import os
import uuid
from pathlib import Path
from datetime import datetime
from sqlalchemy.orm import Session
from .ml_client import predict_priority_and_type
from .document_processor import extract_text_from_file
from .notify import send_status_notification
from models.tramite import Tramite

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

def process_new_tramite(
    db: Session,
    file_path: str,
    citizen_email: str,
    request_type: str = "general"
) -> dict:
    """
    Procesa un nuevo trámite: extrae texto, llama al modelo ML, notifica y registra en BD.
    """
    try:
        # 1. Extraer texto
        print(f"[DEBUG] Extrayendo texto de: {file_path}")
        try:
            document_text = extract_text_from_file(file_path)
            print(f"[DEBUG] Texto extraído: {len(document_text)} caracteres")
        except Exception as e:
            print(f"[ERROR] Fallo en extracción de texto: {e}")
            return {"error": f"Fallo en extracción de texto: {str(e)}"}

        if not document_text.strip():
            document_text = "Documento sin texto extraíble"
            print("[WARN] No se pudo extraer texto, usando texto por defecto")

        # 2. Llamar al modelo ML
        print("[DEBUG] Llamando al modelo ML...")
        metadata = {
            "tipo": request_type,
            "ciudadano": {"email": citizen_email}
        }
        ml_result = predict_priority_and_type(document_text, metadata)
        print(f"[DEBUG] Resultado ML: {ml_result}")

        # 3. Generar ID único
        tramite_id = str(uuid.uuid4())[:8].upper()
        print(f"[DEBUG] ID generado: {tramite_id}")

        # 4. Guardar en base de datos
        print("[DEBUG] Guardando en base de datos...")
        tramite = Tramite(
            tramite_id=tramite_id,
            email_ciudadano=citizen_email,
            tipo_solicitud=request_type,
            archivo_path=file_path,
            texto_extraido=document_text[:1000],  # Guardar primeros 1000 chars
            prioridad=ml_result.get("prioridad", "media"),
            tipo_documento=ml_result.get("tipo_documento", "general"),
            confianza_ml=ml_result.get("confianza", 0.5),
            status="recibido"
        )

        db.add(tramite)
        db.commit()
        db.refresh(tramite)
        print(f"[DEBUG] Trámite guardado con ID: {tramite.id}")

        # 5. Notificar al ciudadano
        print("[DEBUG] Enviando notificación...")
        try:
            notification_sent = send_status_notification(
                email=citizen_email,
                tramite_id=tramite_id,
                status="recibido",
                priority=tramite.prioridad
            )
        except Exception as e:
            print(f"[WARN] Error al enviar notificación: {e}")
            notification_sent = False

        # Actualizar flag de notificación
        tramite.notificacion_enviada = 1 if notification_sent else 0
        db.commit()

        print(f"[SUCCESS] Trámite procesado exitosamente: {tramite_id}")
        return tramite.to_dict()
        
    except Exception as e:
        print(f"[ERROR] Error general en process_new_tramite: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
        return {"error": f"Error al procesar trámite: {str(e)}"}

def get_tramite_by_id(db: Session, tramite_id: str):
    """Obtener trámite por ID"""
    return db.query(Tramite).filter(Tramite.tramite_id == tramite_id).first()

def get_all_tramites(db: Session, skip: int = 0, limit: int = 100):
    """Obtener todos los trámites (paginado)"""
    return db.query(Tramite).order_by(Tramite.created_at.desc()).offset(skip).limit(limit).all()
