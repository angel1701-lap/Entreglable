# 🔄 Guía de Migración: Scikit-learn → TensorFlow

## 📋 Resumen de Cambios

El sistema ha sido actualizado de **Scikit-learn (Random Forest)** a **TensorFlow/Keras (Neural Networks)**.

### ¿Por qué el cambio?

| Ventaja | Descripción |
|---------|-------------|
| 🚀 **Escalabilidad** | Mejor rendimiento con datasets grandes |
| 🎯 **Flexibilidad** | Arquitecturas más complejas (LSTM, Transformers) |
| 💪 **GPU Support** | Aceleración con tarjetas gráficas |
| 📈 **Futuro** | Ecosistema más robusto (TensorBoard, TF Serving) |

---

## 🔧 Pasos de Migración

### 1. Actualizar Dependencias

```bash
cd ml_model

# Activar entorno virtual
venv\Scripts\activate

# Instalar TensorFlow
pip install tensorflow==2.15.0

# O reinstalar todo
pip install -r requirements.txt
```

**Nota**: TensorFlow puede tardar 5-10 minutos en instalarse.

---

### 2. Entrenar Nuevo Modelo

```bash
# Entrenar modelos TensorFlow
python train.py
```

**Archivos generados:**
- ✅ `model_prioridad.h5` (nuevo)
- ✅ `model_tipo.h5` (nuevo)
- ✅ `model_artifacts.pkl` (nuevo)
- ✅ `model_metadata.json` (nuevo)
- ⚠️ `model.pkl` (antiguo - ya no se usa)

---

### 3. Verificar API

```bash
# Iniciar API
python api_ml.py
```

Abrir en navegador: http://localhost:8001

**Respuesta esperada:**
```json
{
  "message": "API ML - Clasificación de Trámites Municipales (TensorFlow)",
  "version": "2.0",
  "framework": "TensorFlow/Keras",
  "status": "ready"
}
```

---

### 4. Probar Predicción

```bash
curl -X POST "http://localhost:8001/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "texto_documento": "solicitud urgente de licencia",
    "tipo_solicitud": "licencia"
  }'
```

**Respuesta esperada:**
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

## 📊 Comparación de Modelos

### Ejecutar script de comparación

```bash
python compare_models.py
```

Este script compara:
- ⏱️ Velocidad de predicción
- 🎯 Precisión de predicciones
- 📈 Confianza promedio

---

## 🔄 Cambios en el Código

### Antes (Scikit-learn)

```python
# train.py
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(n_estimators=50)
clf.fit(X, y)
joblib.dump(clf, 'model.pkl')
```

```python
# api_ml.py
model = joblib.load('model.pkl')
prediction = model.predict(X)[0]
```

### Después (TensorFlow)

```python
# train.py
from tensorflow import keras

model = keras.Sequential([
    layers.Dense(64, activation='relu'),
    layers.Dense(32, activation='relu'),
    layers.Dense(n_classes, activation='softmax')
])
model.compile(optimizer='adam', loss='categorical_crossentropy')
model.fit(X, y, epochs=100)
model.save('model.h5')
```

```python
# api_ml.py
model = keras.models.load_model('model.h5')
probas = model.predict(X)[0]
prediction = encoder.inverse_transform([np.argmax(probas)])[0]
```

---

## ⚠️ Problemas Comunes

### Error: "No module named 'tensorflow'"

```bash
pip install tensorflow==2.15.0
```

### Error: "Could not load model"

Asegúrate de haber ejecutado `python train.py` primero.

### Error: GPU warnings

Si no tienes GPU, es normal ver warnings. El modelo funcionará en CPU.

Para silenciar warnings:
```python
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
```

### Predicciones diferentes

Es normal que las predicciones varíen ligeramente entre modelos. Ambos deberían dar resultados similares.

---

## 🔙 Rollback (Volver a Scikit-learn)

Si necesitas volver a la versión anterior:

### 1. Restaurar archivos

```bash
git checkout HEAD -- train.py api_ml.py requirements.txt
```

### 2. Reinstalar dependencias

```bash
pip uninstall tensorflow
pip install -r requirements.txt
```

### 3. Reentrenar

```bash
python train.py
```

---

## 📈 Próximos Pasos

### Mejoras Recomendadas

1. **Agregar más datos**: Mínimo 100 ejemplos por clase
2. **Validación cruzada**: Implementar K-Fold
3. **Monitoreo**: Usar TensorBoard para visualizar entrenamiento
4. **Optimización**: Ajustar hiperparámetros (learning rate, batch size)
5. **Producción**: Usar TF Serving para deployment

### Recursos

- 📖 [README_TENSORFLOW.md](README_TENSORFLOW.md) - Documentación completa
- 🔬 [compare_models.py](compare_models.py) - Comparar modelos
- 🌐 [TensorFlow Docs](https://www.tensorflow.org/)

---

## ✅ Checklist de Migración

- [ ] Instalar TensorFlow
- [ ] Ejecutar `python train.py`
- [ ] Verificar archivos generados (.h5, .pkl, .json)
- [ ] Iniciar API con `python api_ml.py`
- [ ] Probar endpoint `/predict`
- [ ] Verificar integración con backend
- [ ] Actualizar documentación del proyecto
- [ ] Eliminar archivos antiguos (opcional)

---

## 🎉 ¡Migración Completada!

Tu sistema ahora usa **TensorFlow/Keras** para clasificación de trámites.

**Beneficios inmediatos:**
- ✅ Arquitectura más flexible
- ✅ Mejor escalabilidad
- ✅ Soporte para GPU
- ✅ Ecosistema más robusto

**Próximo paso**: Agregar más datos de entrenamiento para mejorar la precisión.

---

**Versión**: 2.0  
**Fecha**: 2025  
**Framework**: TensorFlow 2.15
