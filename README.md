# 🏛️ Sistema de Gestión de Trámites Municipales con IA

Sistema de gestión de trámites con clasificación automática mediante **Inteligencia Artificial (TensorFlow)** para la Municipalidad Provincial de Yau.

## 🏗️ Stack Tecnológico

- **Frontend**: React 19 + Vite + TailwindCSS
- **Backend**: FastAPI + SQLAlchemy
- **Base de Datos**: MySQL (XAMPP)
- **ML**: TensorFlow 2.15 + Keras

## 📋 Requisitos

- Python 3.8+
- Node.js 18+
- XAMPP (MySQL)
- Tesseract OCR (opcional)

## 🚀 Instalación

### 1. Clonar Repositorio
```bash
git clone https://github.com/angel1701-lap/Entreglable.git
cd Entreglable/Proyecto1
```

### 2. Base de Datos
1. Iniciar MySQL en XAMPP
2. Abrir phpMyAdmin: http://localhost/phpmyadmin
3. Ejecutar: `backend/init_db.sql`

### 3. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

### 4. Modelo ML
```bash
cd ml_model
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python train.py
```

### 5. Frontend
```bash
cd frontend
npm install
```

## ▶️ Iniciar Sistema

```bash
# Terminal 1 - ML API
cd ml_model
venv\Scripts\activate
python api_ml.py

# Terminal 2 - Backend
cd backend
venv\Scripts\activate
python main.py

# Terminal 3 - Frontend
cd frontend
npm run dev
```

**URLs**:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- ML API: http://localhost:8001

## 📁 Estructura del Proyecto

```
Proyecto1/
├── backend/
│   ├── models/
│   │   └── tramite.py          # Modelo SQLAlchemy
│   ├── services/
│   │   ├── document_processor.py  # Extracción de texto
│   │   ├── ml_client.py           # Cliente ML
│   │   ├── notify.py              # Notificaciones email
│   │   └── tramite_service.py     # Lógica de negocio
│   ├── database.py              # Configuración BD
│   ├── main.py                  # API FastAPI
│   ├── requirements.txt
│   ├── init_db.sql             # Script SQL
│   └── .env                    # Configuración
├── ml_model/
│   ├── api_ml.py               # API del modelo
│   ├── train.py                # Entrenamiento
│   └── model.pkl               # Modelo entrenado
└── frontend/
    ├── src/
    │   ├── components/         # Componentes React
    │   ├── pages/              # Páginas
    │   ├── services/           # API client
    │   └── App.jsx
    └── package.json
```

## 🔧 Configuración

### Backend (.env)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=municipalidad_db

ML_API_URL=http://localhost:8001

# Opcional: Configurar para notificaciones email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_password
```

## 🎯 Funcionalidades

### Para Ciudadanos:
- ✅ Subir documentos (PDF, imágenes)
- ✅ Consultar estado de trámites
- ✅ Recibir notificaciones por email
- ✅ Clasificación automática con IA

### Para Administradores:
- ✅ Dashboard con todos los trámites
- ✅ Visualización de prioridades
- ✅ Filtrado y búsqueda
- ✅ Métricas en tiempo real

### Sistema ML:
- ✅ Clasificación de prioridad (alta/media/baja)
- ✅ Detección de tipo de documento
- ✅ Nivel de confianza de predicciones
- ✅ OCR para imágenes

## 🧪 Probar el Sistema

1. Acceder a: `http://localhost:5173`
2. Subir un documento de prueba
3. Consultar el estado con el ID generado
4. Ver el dashboard administrativo

## 📊 Base de Datos

La tabla principal `tramites` almacena:
- ID único del trámite
- Email del ciudadano
- Tipo de solicitud
- Texto extraído
- Prioridad (ML)
- Estado actual
- Timestamps

## 🔐 Seguridad

- CORS configurado para desarrollo
- Validación de tipos de archivo
- Sanitización de inputs
- Sesiones de BD con context managers

## 📝 Notas

- El modelo ML es básico y debe ser reentrenado con datos reales
- Las notificaciones email requieren configuración SMTP
- Tesseract OCR debe estar instalado en el sistema
- Para producción, configurar variables de entorno apropiadas

## 🔧 Configuración

Editar `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=municipalidad_db
ML_API_URL=http://localhost:8001
```

## 📝 Licencia

MIT License - Ver [LICENSE](LICENSE)
