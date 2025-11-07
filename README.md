# 🏛️ Sistema de Gestión de Trámites Municipales con IA

Sistema completo para la **Municipalidad Provincial de Yau** que utiliza inteligencia artificial para clasificar y priorizar trámites automáticamente.

![Estado](https://img.shields.io/badge/Estado-Completo-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![MySQL](https://img.shields.io/badge/MySQL-XAMPP-orange)

## 🏗️ Arquitectura

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Backend**: FastAPI + Python
- **Base de Datos**: MySQL (XAMPP)
- **ML Model**: TensorFlow/Keras (redes neuronales para clasificación)

## 📋 Requisitos Previos

1. **XAMPP** instalado y corriendo (Apache + MySQL)
2. **Python 3.8+**
3. **Node.js 18+**
4. **Tesseract OCR** (para extracción de texto de imágenes)

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)

1. Asegúrate de tener XAMPP corriendo (MySQL)
2. Doble clic en: **`INICIAR_TODO.bat`**
3. Espera a que se abran las 3 ventanas
4. Accede a: http://localhost:5173

### Opción 2: Manual

Ver archivo **`INSTALACION.md`** para instrucciones detalladas.

---

## 📚 Documentación

- **[INSTALACION.md](INSTALACION.md)** - Guía completa de instalación paso a paso
- **[GUIA_USO.md](GUIA_USO.md)** - Manual de usuario para ciudadanos y administradores
- **[README.md](README.md)** - Este archivo (información general)

---

## 🛠️ Instalación Detallada

### 1. Configurar Base de Datos (XAMPP)

1. Abrir XAMPP Control Panel
2. Iniciar **Apache** y **MySQL**
3. Abrir phpMyAdmin: `http://localhost/phpmyadmin`
4. Ejecutar el script `backend/init_db.sql` para crear la base de datos

### 2. Backend (FastAPI)

```bash
cd Proyecto1/backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar archivo de configuración
copy .env.example .env

# Editar .env con tus credenciales de MySQL
```

### 3. Modelo ML

```bash
cd Proyecto1/ml_model

# Entrenar modelo (genera model.pkl)
python train.py

# Iniciar API del modelo
python api_ml.py
```

El modelo estará disponible en: `http://localhost:8001`

### 4. Iniciar Backend

```bash
cd Proyecto1/backend
python main.py
```

El backend estará disponible en: `http://localhost:8000`

### 5. Frontend (React)

```bash
cd Proyecto1/frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

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

## 🐛 Troubleshooting

**Error de conexión a MySQL:**
- Verificar que XAMPP MySQL esté corriendo
- Revisar credenciales en `.env`
- Verificar que la BD `municipalidad_db` exista

**Error de OCR:**
- Instalar Tesseract: https://github.com/tesseract-ocr/tesseract
- Agregar Tesseract al PATH del sistema

**Error de CORS:**
- Verificar que el frontend esté en `localhost:5173`
- Ajustar `allow_origins` en `main.py` si es necesario

**Error TensorFlow GPU:**
- Normal si no tienes GPU NVIDIA
- El modelo funciona perfectamente en CPU
- Para silenciar warnings, ver `ml_model/README_TENSORFLOW.md`

**Error "models not loaded":**
- Ejecutar primero: `cd ml_model && python train.py`
- Verificar que existan los archivos `.h5`

## 🆕 Novedades - Versión 2.0

### Migración a TensorFlow/Keras
El sistema ahora usa **TensorFlow 2.15** en lugar de Scikit-learn:
- ✅ Mejor escalabilidad con datasets grandes
- ✅ Arquitectura de redes neuronales más flexible
- ✅ Soporte para GPU (opcional)
- ✅ Accuracy mejorado (~90-95%)

**Documentación completa**: `ml_model/README_TENSORFLOW.md`  
**Guía de migración**: `ml_model/MIGRACION_TENSORFLOW.md`

## 📧 Soporte

Para problemas o consultas:
1. Revisar logs en consola de cada servicio
2. Consultar `FAQ.md` para problemas comunes
3. Ver `ml_model/README_TENSORFLOW.md` para temas de ML
