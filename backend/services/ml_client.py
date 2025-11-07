# backend/services/ml_client.py
import requests
from typing import Dict, Any

ML_API_URL = "http://localhost:8001/predict"  # Cambia si usas Docker o nube

def predict_priority_and_type(document_text: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
    """
    Envía el texto del documento al modelo de ML y retorna la predicción.
    """
    payload = {
        "texto_documento": document_text,
        "tipo_solicitud": metadata.get("tipo", "general"),
        "datos_ciudadano": metadata.get("ciudadano", {})
    }

    try:
        response = requests.post(ML_API_URL, json=payload, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        # En producción, usar logger
        print(f"Error al conectar con el modelo ML: {e}")
        return {
            "prioridad": "baja",
            "tipo_documento": "desconocido",
            "confianza": 0.0,
            "error": True
        }