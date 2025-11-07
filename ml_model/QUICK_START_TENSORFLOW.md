# ⚡ Quick Start - TensorFlow

## 🚀 Inicio Rápido (3 pasos)

### 1️⃣ Instalar
```bash
cd ml_model
pip install -r requirements.txt
```
⏱️ Tiempo: 5-10 minutos (TensorFlow es grande)

### 2️⃣ Entrenar
```bash
python train.py
```
⏱️ Tiempo: 30-60 segundos

**Salida esperada:**
```
[SUCCESS] ✓ Entrenamiento completado exitosamente!
```

### 3️⃣ Iniciar API
```bash
python api_ml.py
```

**Verificar**: http://localhost:8001

---

## ✅ Verificación Rápida

### Probar modelo
```bash
python test_model.py
```

### Probar API
```bash
curl -X POST "http://localhost:8001/predict" \
  -H "Content-Type: application/json" \
  -d '{"texto_documento": "solicitud urgente de licencia"}'
```

---

## 📁 Archivos Generados

Después de entrenar, deberías tener:
- ✅ `model_prioridad.h5` (~200 KB)
- ✅ `model_tipo.h5` (~200 KB)
- ✅ `model_artifacts.pkl` (~50 KB)
- ✅ `model_metadata.json` (~1 KB)

---

## 🆘 Problemas Comunes

### "No module named 'tensorflow'"
```bash
pip install tensorflow==2.15.0
```

### "models not loaded"
```bash
python train.py
```

### GPU warnings
Normal si no tienes GPU. Funciona en CPU.

---

## 📚 Más Información

- **Documentación completa**: [README_TENSORFLOW.md](README_TENSORFLOW.md)
- **Guía de migración**: [MIGRACION_TENSORFLOW.md](MIGRACION_TENSORFLOW.md)
- **Changelog**: [../CHANGELOG_TENSORFLOW.md](../CHANGELOG_TENSORFLOW.md)

---

**¿Listo?** → `python api_ml.py` 🚀
