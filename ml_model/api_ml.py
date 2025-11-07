# ml_model/api_ml.py
from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
from tensorflow import keras
import joblib
import numpy as np
import json
from pathlib import Path

app = FastAPI(title="API ML - Clasificación de Trámites (TensorFlow)")

# Variables globales para los modelos
model_prioridad = None
model_tipo = None
vectorizer = None
encoder_prioridad = None
encoder_tipo = None
metadata = None

@app.on_event("startup")
def load_models():
    """Cargar modelos TensorFlow al iniciar la API"""
    global model_prioridad, model_tipo, vectorizer, encoder_prioridad, encoder_tipo, metadata
    
    try:
        print(f"[INFO] TensorFlow version: {tf.__version__}")
        
        # Cargar modelos TensorFlow
        model_prioridad = keras.models.load_model('model_prioridad.h5')
        model_tipo = keras.models.load_model('model_tipo.h5')
        print("[INFO] ✓ Modelos TensorFlow cargados")
        
        # Cargar vectorizador y encoders
        artifacts = joblib.load('model_artifacts.pkl')
        vectorizer = artifacts['vectorizer']
        encoder_prioridad = artifacts['encoder_prioridad']
        encoder_tipo = artifacts['encoder_tipo']
        print("[INFO] ✓ Vectorizador y encoders cargados")
        
        # Cargar metadata
        if Path('model_metadata.json').exists():
            with open('model_metadata.json', 'r', encoding='utf-8') as f:
                metadata = json.load(f)
            print(f"[INFO] ✓ Metadata cargada")
            print(f"[INFO]   - Clases prioridad: {metadata['clases_prioridad']}")
            print(f"[INFO]   - Clases tipo: {metadata['clases_tipo']}")
        
        print("[SUCCESS] Sistema ML listo para predicciones")
        
    except Exception as e:
        print(f"[ERROR] No se pudieron cargar los modelos: {e}")
        print("[WARN] Ejecuta 'python train.py' primero para entrenar los modelos")

class PredictionRequest(BaseModel):
    texto_documento: str
    tipo_solicitud: str = "general"
    datos_ciudadano: dict = {}

@app.get("/")
def root():
    return {
        "message": "API ML - Clasificación de Trámites Municipales (TensorFlow)",
        "version": "2.0",
        "framework": "TensorFlow/Keras",
        "status": "ready" if model_prioridad and model_tipo else "models_not_loaded"
    }

@app.get("/health")
def health_check():
    """Verificar estado de los modelos"""
    return {
        "status": "healthy" if model_prioridad and model_tipo else "unhealthy",
        "models_loaded": {
            "prioridad": model_prioridad is not None,
            "tipo": model_tipo is not None,
            "vectorizer": vectorizer is not None
        },
        "metadata": metadata
    }

@app.post("/predict")
def predict(request: PredictionRequest):
    """Predecir prioridad y tipo de documento usando TensorFlow"""
    
    # Verificar que los modelos estén cargados
    if not model_prioridad or not model_tipo or not vectorizer:
        return {
            "prioridad": "media",
            "tipo_documento": "general",
            "confianza": 0.5,
            "error": "Modelos no disponibles. Ejecuta 'python train.py' primero."
        }
    
    try:
        # Vectorizar texto con TF-IDF
        X = vectorizer.transform([request.texto_documento]).toarray()
        
        # Predecir prioridad con TensorFlow
        prioridad_proba = model_prioridad.predict(X, verbose=0)[0]
        prioridad_idx = np.argmax(prioridad_proba)
        prioridad = encoder_prioridad.inverse_transform([prioridad_idx])[0]
        confianza_prioridad = float(np.max(prioridad_proba))
        
        # Predecir tipo con TensorFlow
        tipo_proba = model_tipo.predict(X, verbose=0)[0]
        tipo_idx = np.argmax(tipo_proba)
        tipo = encoder_tipo.inverse_transform([tipo_idx])[0]
        confianza_tipo = float(np.max(tipo_proba))
        
        # Confianza promedio
        confianza = (confianza_prioridad + confianza_tipo) / 2
        
        return {
            "prioridad": prioridad,
            "tipo_documento": tipo,
            "confianza": round(confianza, 3),
            "detalles": {
                "confianza_prioridad": round(confianza_prioridad, 3),
                "confianza_tipo": round(confianza_tipo, 3),
                "probabilidades_prioridad": {
                    clase: round(float(prob), 3)
                    for clase, prob in zip(encoder_prioridad.classes_, prioridad_proba)
                },
                "probabilidades_tipo": {
                    clase: round(float(prob), 3)
                    for clase, prob in zip(encoder_tipo.classes_, tipo_proba)
                }
            },
            "framework": "TensorFlow"
        }
    
    except Exception as e:
        print(f"[ERROR] Error en predicción: {e}")
        import traceback
        traceback.print_exc()
        return {
            "prioridad": "media",
            "tipo_documento": "general",
            "confianza": 0.5,
            "error": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("  API ML - Sistema de Clasificación de Trámites")
    print("  Framework: TensorFlow/Keras")
    print("="*60 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=8001)
