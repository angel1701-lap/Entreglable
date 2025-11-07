# backend/models/tramite.py
from sqlalchemy import Column, Integer, String, DateTime, Float, Text
from datetime import datetime
from database import Base

class Tramite(Base):
    __tablename__ = "tramites"

    id = Column(Integer, primary_key=True, index=True)
    tramite_id = Column(String(50), unique=True, index=True, nullable=False)
    email_ciudadano = Column(String(255), nullable=False)
    tipo_solicitud = Column(String(100), nullable=False)
    archivo_path = Column(String(500))
    texto_extraido = Column(Text)
    prioridad = Column(String(20))  # alta, media, baja
    tipo_documento = Column(String(100))
    confianza_ml = Column(Float)
    status = Column(String(50), default="recibido")  # recibido, en_proceso, completado
    notificacion_enviada = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "tramite_id": self.tramite_id,
            "email_ciudadano": self.email_ciudadano,
            "tipo_solicitud": self.tipo_solicitud,
            "prioridad": self.prioridad,
            "tipo_documento": self.tipo_documento,
            "confianza": self.confianza_ml,
            "status": self.status,
            "notificacion_enviada": bool(self.notificacion_enviada),
            "timestamp": self.created_at.isoformat() if self.created_at else None
        }
