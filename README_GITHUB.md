# 🏛️ Sistema de Gestión de Trámites Municipales con IA

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-orange.svg)](https://www.tensorflow.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sistema completo de gestión de trámites municipales con clasificación automática mediante **Inteligencia Artificial (TensorFlow)** para la Municipalidad Provincial de Yau.

![Sistema Municipal](https://img.shields.io/badge/Estado-Funcional-success)

---

## 🎯 Características Principales

- 🤖 **Clasificación Automática con IA**: Redes neuronales TensorFlow para priorizar trámites
- 📄 **Procesamiento de Documentos**: Extracción de texto de PDFs e imágenes (OCR)
- 📊 **Dashboard Administrativo**: Gestión y visualización de trámites en tiempo real
- 🔔 **Notificaciones**: Sistema de alertas por email
- 🔍 **Consulta de Estado**: Seguimiento de trámites con ID único
- 🎨 **Interfaz Moderna**: React 19 + TailwindCSS

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────┐
│  Frontend (React 19 + Vite + TailwindCSS)      │
│  Puerto: 5173                                   │
└────────────────┬────────────────────────────────┘
                 │ HTTP REST
┌────────────────▼────────────────────────────────┐
│  Backend (FastAPI + SQLAlchemy)                 │
│  Puerto: 8000                                   │
└────────┬───────────────────────┬─────────────────┘
         │                       │
         │ HTTP                  │ SQL
         ▼                       ▼
┌────────────────┐      ┌────────────────┐
│  ML API        │      │  MySQL         │
│  TensorFlow    │      │  (XAMPP)       │
│  Puerto: 8001  │      │  Puerto: 3306  │
└────────────────┘      └────────────────┘
```

### Stack Tecnológico

**Frontend:**
- React 19 con React Compiler
- Vite (Rolldown)
- TailwindCSS
- TypeScript

**Backend:**
- FastAPI
- SQLAlchemy ORM
- PyMySQL
- Python-dotenv

**Machine Learning:**
- TensorFlow 2.15 + Keras
- Scikit-learn (TF-IDF)
- Pandas, NumPy

**Base de Datos:**
- MySQL (XAMPP)

---

## 📋 Requisitos Previos

- **Python 3.8+** - [Descargar](https://www.python.org/downloads/)
- **Node.js 18+** - [Descargar](https://nodejs.org/)
- **XAMPP** (MySQL) - [Descargar](https://www.apachefriends.org/)
- **Tesseract OCR** (opcional) - [Descargar](https://github.com/UB-Mannheim/tesseract/wiki)

---

## 🚀 Instalación Rápida

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/angel1701-lap/Entreglable.git
cd Entreglable/Proyecto1
```

### 2️⃣ Verificar Requisitos

```bash
# Windows
VERIFICAR_SISTEMA.bat

# Linux/Mac
python --version
node --version
```

### 3️⃣ Configurar Base de Datos

1. Abrir **XAMPP Control Panel**
2. Iniciar **MySQL**
3. Abrir **phpMyAdmin**: http://localhost/phpmyadmin
4. Ejecutar el script: `backend/init_db.sql`

### 4️⃣ Instalar Dependencias

```bash
# Windows (Recomendado)
INSTALAR.bat

# Linux/Mac (Manual)
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
cp .env.example .env

# ML Model
cd ../ml_model
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python train.py

# Frontend
cd ../frontend
npm install
```

⏱️ **Tiempo estimado**: 10-15 minutos (TensorFlow tarda ~5-10 min)

### 5️⃣ Iniciar el Sistema

```bash
# Windows
INICIAR_TODO.bat

# Linux/Mac (3 terminales)
# Terminal 1
cd ml_model && source venv/bin/activate && python api_ml.py

# Terminal 2
cd backend && source venv/bin/activate && python main.py

# Terminal 3
cd frontend && npm run dev
```

### 6️⃣ Acceder al Sistema

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **ML API**: http://localhost:8001
- **phpMyAdmin**: http://localhost/phpmyadmin

---

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| [EMPEZAR_AQUI.txt](EMPEZAR_AQUI.txt) | Punto de entrada principal |
| [COMO_USAR.md](COMO_USAR.md) | Guía completa de uso |
| [INSTALACION.md](INSTALACION.md) | Instalación detallada |
| [FAQ.md](FAQ.md) | Preguntas frecuentes |
| [ml_model/README_TENSORFLOW.md](ml_model/README_TENSORFLOW.md) | Documentación del modelo ML |
| [CHANGELOG_TENSORFLOW.md](CHANGELOG_TENSORFLOW.md) | Registro de cambios |

---

## 🤖 Modelo de Machine Learning

### Arquitectura de la Red Neuronal

```
Input (100 features TF-IDF)
    ↓
Dense(64, relu) + Dropout(0.3)
    ↓
Dense(32, relu) + Dropout(0.2)
    ↓
Dense(n_classes, softmax)
```

### Clasificadores

1. **Prioridad**: Alta, Media, Baja
2. **Tipo**: Licencia, CV, Denuncia, Certificado, Reclamo

### Métricas

- **Accuracy**: ~90-95%
- **Confianza promedio**: >0.85
- **Framework**: TensorFlow 2.15

---

## 🎯 Uso del Sistema

### Para Ciudadanos

1. **Subir Trámite**
   - Acceder a http://localhost:5173
   - Completar formulario
   - Subir documento (PDF/imagen)
   - Recibir ID único

2. **Consultar Estado**
   - Ingresar ID del trámite
   - Ver estado y prioridad

### Para Administradores

1. **Dashboard**
   - Ver todos los trámites
   - Filtrar por prioridad
   - Gestionar solicitudes

---

## 🔧 Configuración

### Variables de Entorno (backend/.env)

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=municipalidad_db

# ML API
ML_API_URL=http://localhost:8001

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_password
```

---

## 🧪 Pruebas

### Probar el Sistema Completo

```bash
# Windows
PROBAR_SISTEMA.bat

# Linux/Mac
cd ml_model
source venv/bin/activate
python test_model.py
```

### Probar API ML

```bash
curl -X POST "http://localhost:8001/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "texto_documento": "solicitud urgente de licencia de construcción",
    "tipo_solicitud": "licencia"
  }'
```

---

## 📊 Estructura del Proyecto

```
Proyecto1/
├── backend/              # API FastAPI
│   ├── models/          # Modelos SQLAlchemy
│   ├── services/        # Lógica de negocio
│   ├── main.py          # Punto de entrada
│   └── database.py      # Configuración BD
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas
│   │   └── services/    # API client
│   └── package.json
├── ml_model/            # Modelo TensorFlow
│   ├── train.py         # Entrenamiento
│   ├── api_ml.py        # API del modelo
│   └── requirements.txt
└── docs/                # Documentación
```

---

## 🐛 Troubleshooting

### Error: MySQL no está corriendo
```bash
Solución: Iniciar MySQL desde XAMPP Control Panel
```

### Error: Modelos no encontrados
```bash
cd ml_model
python train.py
```

### Error: Puerto ocupado
```bash
# Verificar puertos en uso
netstat -ano | findstr :8000
netstat -ano | findstr :8001
netstat -ano | findstr :5173
```

### Error: TensorFlow GPU warnings
```
Es normal si no tienes GPU NVIDIA.
El modelo funciona perfectamente en CPU.
```

Más soluciones en [FAQ.md](FAQ.md)

---

## 🔐 Seguridad

⚠️ **Nota**: Este proyecto es para desarrollo/demostración. Para producción:

- [ ] Implementar autenticación JWT
- [ ] Agregar rate limiting
- [ ] Configurar HTTPS
- [ ] Validar tamaño de archivos
- [ ] Encriptar datos sensibles
- [ ] Implementar CORS restrictivo

---

## 📈 Roadmap

### Versión 2.1
- [ ] Validación cruzada (K-Fold)
- [ ] Early stopping
- [ ] Métricas adicionales (F1-score)
- [ ] Exportación de reportes

### Versión 3.0
- [ ] Transfer learning con BERT
- [ ] Modelo multilingüe
- [ ] App móvil
- [ ] Integración con firma digital

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

- **Angel** - [angel1701-lap](https://github.com/angel1701-lap)

---

## 🙏 Agradecimientos

- TensorFlow Team
- FastAPI
- React Team
- Comunidad Open Source

---

## 📞 Soporte

- 📧 Email: [Crear issue en GitHub](https://github.com/angel1701-lap/Entreglable/issues)
- 📖 Documentación: [Wiki](https://github.com/angel1701-lap/Entreglable/wiki)
- 💬 Discusiones: [Discussions](https://github.com/angel1701-lap/Entreglable/discussions)

---

## ⭐ Dale una Estrella

Si este proyecto te fue útil, considera darle una ⭐ en GitHub!

---

**Versión**: 2.0  
**Framework ML**: TensorFlow 2.15  
**Estado**: ✅ Funcional y listo para usar

---

Made with ❤️ for Municipalidad Provincial de Yau
