# 🤖 Modelo ML con TensorFlow/Keras

## 📋 Descripción

Este módulo contiene el modelo de Machine Learning basado en **TensorFlow/Keras** para clasificar trámites municipales.

### Características:
- **Framework**: TensorFlow 2.15 + Keras
- **Arquitectura**: Redes Neuronales Densas (Dense Neural Networks)
- **Vectorización**: TF-IDF (Scikit-learn)
- **Dos clasificadores**:
  1. **Prioridad**: alta, media, baja
  2. **Tipo**: licencia, cv, denuncia, certificado, reclamo

---

## 🏗️ Arquitectura del Modelo

### Modelo de Prioridad
```
Input (100 features TF-IDF)
    ↓
Dense(64, relu) + Dropout(0.3)
    ↓
Dense(32, relu) + Dropout(0.2)
    ↓
Dense(3, softmax) → [alta, baja, media]
```

### Modelo de Tipo
```
Input (100 features TF-IDF)
    ↓
Dense(64, relu) + Dropout(0.3)
    ↓
Dense(32, relu) + Dropout(0.2)
    ↓
Dense(5, softmax) → [certificado, cv, denuncia, licencia, reclamo]
```

---

## 🚀 Instalación

### 1. Crear entorno virtual
```bash
cd ml_model
python -m venv venv
```

### 2. Activar entorno
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Instalar dependencias
```bash
pip install -r requirements.txt
```

**Nota**: TensorFlow puede tardar varios minutos en instalarse.

---

## 🎓 Entrenamiento

### Entrenar el modelo
```bash
python train.py
```

### Salida esperada:
```
[INFO] TensorFlow version: 2.15.0
[INFO] Dataset: 20 ejemplos
[INFO] Features TF-IDF: 100
[INFO] Clases prioridad: ['alta' 'baja' 'media']
[INFO] Clases tipo: ['certificado' 'cv' 'denuncia' 'licencia' 'reclamo']

[INFO] Entrenando modelo de PRIORIDAD...
[INFO] Accuracy final (prioridad): 0.950

[INFO] Entrenando modelo de TIPO...
[INFO] Accuracy final (tipo): 0.900

[INFO] Modelos TensorFlow guardados:
  - model_prioridad.h5
  - model_tipo.h5
  - model_artifacts.pkl (vectorizer + encoders)
  - model_metadata.json

[SUCCESS] ✓ Entrenamiento completado exitosamente!
```

### Archivos generados:
- `model_prioridad.h5` - Modelo TensorFlow para prioridad
- `model_tipo.h5` - Modelo TensorFlow para tipo
- `model_artifacts.pkl` - Vectorizador TF-IDF y encoders
- `model_metadata.json` - Metadata del modelo

---

## 🌐 API del Modelo

### Iniciar servidor
```bash
python api_ml.py
```

El servidor estará disponible en: `http://localhost:8001`

### Endpoints

#### 1. Health Check
```bash
GET http://localhost:8001/
```

**Respuesta:**
```json
{
  "message": "API ML - Clasificación de Trámites Municipales (TensorFlow)",
  "version": "2.0",
  "framework": "TensorFlow/Keras",
  "status": "ready"
}
```

#### 2. Estado del Sistema
```bash
GET http://localhost:8001/health
```

**Respuesta:**
```json
{
  "status": "healthy",
  "models_loaded": {
    "prioridad": true,
    "tipo": true,
    "vectorizer": true
  },
  "metadata": {
    "tensorflow_version": "2.15.0",
    "input_shape": 100,
    "clases_prioridad": ["alta", "baja", "media"],
    "clases_tipo": ["certificado", "cv", "denuncia", "licencia", "reclamo"],
    "accuracy_prioridad": 0.95,
    "accuracy_tipo": 0.90
  }
}
```

#### 3. Predicción
```bash
POST http://localhost:8001/predict
Content-Type: application/json

{
  "texto_documento": "solicitud urgente de licencia de construcción",
  "tipo_solicitud": "licencia",
  "datos_ciudadano": {"email": "test@example.com"}
}
```

**Respuesta:**
```json
{
  "prioridad": "alta",
  "tipo_documento": "licencia",
  "confianza": 0.892,
  "detalles": {
    "confianza_prioridad": 0.945,
    "confianza_tipo": 0.839,
    "probabilidades_prioridad": {
      "alta": 0.945,
      "baja": 0.012,
      "media": 0.043
    },
    "probabilidades_tipo": {
      "certificado": 0.023,
      "cv": 0.045,
      "denuncia": 0.089,
      "licencia": 0.839,
      "reclamo": 0.004
    }
  },
  "framework": "TensorFlow"
}
```

---

## 🧪 Probar el Modelo

### Usando Python
```python
import requests

url = "http://localhost:8001/predict"
data = {
    "texto_documento": "curriculum vitae ingeniero civil con experiencia",
    "tipo_solicitud": "cv"
}

response = requests.post(url, json=data)
print(response.json())
```

### Usando curl
```bash
curl -X POST "http://localhost:8001/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "texto_documento": "denuncia por contaminación ambiental urgente",
    "tipo_solicitud": "denuncia"
  }'
```

---

## 📊 Comparación: Scikit-learn vs TensorFlow

| Característica | Scikit-learn | TensorFlow |
|----------------|--------------|------------|
| **Algoritmo** | Random Forest | Neural Network |
| **Tamaño modelo** | ~50 KB | ~200 KB |
| **Velocidad entrenamiento** | Rápido (segundos) | Medio (minutos) |
| **Velocidad predicción** | Muy rápido | Rápido |
| **Escalabilidad** | Limitada | Excelente |
| **Flexibilidad** | Media | Alta |
| **GPU Support** | No | Sí |
| **Interpretabilidad** | Alta | Baja |

---

## 🔧 Configuración Avanzada

### Ajustar hiperparámetros

Edita `train.py` para modificar:

```python
# Arquitectura de la red
layers.Dense(64, activation='relu')  # Cambiar número de neuronas
layers.Dropout(0.3)                  # Ajustar dropout

# Entrenamiento
epochs=100                           # Más épocas = mejor aprendizaje
batch_size=4                         # Tamaño del batch
validation_split=0.2                 # % datos para validación
```

### Agregar más datos

Edita el array `data` en `train.py`:

```python
data = {
    'texto': [
        'tu nuevo ejemplo aquí',
        # ... más ejemplos
    ],
    'prioridad': ['alta', ...],
    'tipo': ['licencia', ...]
}
```

**Recomendación**: Mínimo 100 ejemplos por clase para producción.

---

## 🐛 Troubleshooting

### Error: "No module named 'tensorflow'"
```bash
pip install tensorflow==2.15.0
```

### Error: "Could not load dynamic library 'cudart64_110.dll'"
TensorFlow está buscando GPU. Para usar solo CPU:
```python
import os
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
```

### Error: "models not loaded"
Ejecuta primero el entrenamiento:
```bash
python train.py
```

### Predicciones incorrectas
- Agregar más datos de entrenamiento
- Aumentar épocas de entrenamiento
- Ajustar arquitectura de la red

---

## 📈 Mejoras Futuras

### Corto Plazo:
- [ ] Validación cruzada (K-Fold)
- [ ] Early stopping
- [ ] Guardar mejor modelo durante entrenamiento
- [ ] Métricas adicionales (F1-score, confusion matrix)

### Mediano Plazo:
- [ ] Embeddings pre-entrenados (Word2Vec, GloVe)
- [ ] Arquitecturas más complejas (LSTM, Transformers)
- [ ] Data augmentation
- [ ] Balanceo de clases

### Largo Plazo:
- [ ] Transfer learning con BERT
- [ ] Modelo multilingüe
- [ ] Active learning
- [ ] Explicabilidad (LIME, SHAP)

---

## 📚 Recursos

- **TensorFlow**: https://www.tensorflow.org/
- **Keras**: https://keras.io/
- **Scikit-learn**: https://scikit-learn.org/
- **FastAPI**: https://fastapi.tiangolo.com/

---

## 🎓 Notas Técnicas

### ¿Por qué TensorFlow?
- Mayor flexibilidad para arquitecturas complejas
- Soporte para GPU/TPU
- Mejor escalabilidad con grandes datasets
- Ecosistema robusto (TensorBoard, TF Serving)

### ¿Cuándo usar Scikit-learn?
- Datasets pequeños (< 10,000 ejemplos)
- Necesitas interpretabilidad
- Prototipado rápido
- Recursos limitados

### Recomendación
Para este proyecto con datos limitados, ambos funcionan bien. TensorFlow ofrece mejor escalabilidad a futuro.

---

**Versión**: 2.0  
**Framework**: TensorFlow 2.15  
**Última actualización**: 2025
