# 📦 Guía de Instalación - Sistema Municipal con IA

## ✅ Requisitos Previos

### 1. XAMPP
- Descargar desde: https://www.apachefriends.org/
- Instalar y ejecutar **Apache** y **MySQL**

### 2. Python 3.8+
- Descargar desde: https://www.python.org/downloads/
- ⚠️ **IMPORTANTE**: Marcar "Add Python to PATH" durante la instalación

### 3. Node.js 18+
- Descargar desde: https://nodejs.org/
- Instalar versión LTS recomendada

### 4. Tesseract OCR (para reconocimiento de texto en imágenes)
- Descargar desde: https://github.com/UB-Mannheim/tesseract/wiki
- Instalar y agregar al PATH del sistema
- Ruta típica: `C:\Program Files\Tesseract-OCR`

---

## 🗄️ Paso 1: Configurar Base de Datos

### Opción A: Usando phpMyAdmin (Recomendado)

1. Abrir XAMPP Control Panel
2. Iniciar **MySQL**
3. Clic en "Admin" junto a MySQL (abre phpMyAdmin)
4. Ir a la pestaña "SQL"
5. Copiar y pegar el contenido de `backend/init_db.sql`
6. Clic en "Ejecutar"

### Opción B: Usando línea de comandos

```bash
# Abrir terminal en la carpeta del proyecto
cd Proyecto1/backend

# Conectar a MySQL
mysql -u root -p

# Ejecutar el script
source init_db.sql
```

### Verificar instalación:
- En phpMyAdmin, deberías ver la base de datos `municipalidad_db`
- Con la tabla `tramites` y 3 registros de ejemplo

---

## 🤖 Paso 2: Configurar Modelo ML (TensorFlow)

```bash
# Abrir terminal en la carpeta del proyecto
cd Proyecto1/ml_model

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
venv\Scripts\activate

# Instalar dependencias (TensorFlow puede tardar 5-10 minutos)
pip install -r requirements.txt

# Entrenar modelo (genera archivos .h5)
python train.py
```

**Resultado esperado:**
```
[INFO] TensorFlow version: 2.15.0
[INFO] Dataset: 20 ejemplos
[INFO] Features TF-IDF: 100
[INFO] Entrenando modelo de PRIORIDAD...
[INFO] Accuracy final (prioridad): 0.950
[INFO] Entrenando modelo de TIPO...
[INFO] Accuracy final (tipo): 0.900
[INFO] Modelos TensorFlow guardados:
  - model_prioridad.h5
  - model_tipo.h5
  - model_artifacts.pkl
  - model_metadata.json
[SUCCESS] ✓ Entrenamiento completado exitosamente!
```

**Nota**: La instalación de TensorFlow puede tardar varios minutos.

---

## 🔧 Paso 3: Configurar Backend

```bash
cd Proyecto1/backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar archivo de configuración
copy .env.example .env
```

### Editar archivo `.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=          # Dejar vacío si no configuraste password en XAMPP
DB_NAME=municipalidad_db

ML_API_URL=http://localhost:8001
```

---

## 🎨 Paso 4: Configurar Frontend

```bash
cd Proyecto1/frontend

# Instalar dependencias
npm install
```

---

## 🚀 Paso 5: Iniciar el Sistema

### Opción A: Usando scripts automáticos (Windows)

1. **Iniciar Modelo ML**: Doble clic en `start_ml.bat`
2. **Iniciar Backend**: Doble clic en `start_backend.bat`
3. **Iniciar Frontend**: Doble clic en `start_frontend.bat`

### Opción B: Manual (3 terminales separadas)

**Terminal 1 - Modelo ML:**
```bash
cd Proyecto1/ml_model
venv\Scripts\activate
python api_ml.py
```

**Terminal 2 - Backend:**
```bash
cd Proyecto1/backend
venv\Scripts\activate
python main.py
```

**Terminal 3 - Frontend:**
```bash
cd Proyecto1/frontend
npm run dev
```

---

## 🌐 Acceder al Sistema

Una vez iniciados los 3 servicios:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **ML API**: http://localhost:8001
- **phpMyAdmin**: http://localhost/phpmyadmin

---

## ✅ Verificar Instalación

### 1. Verificar Backend:
Abrir en navegador: http://localhost:8000
```json
{"message": "API Municipalidad - Sistema de Trámites con IA"}
```

### 2. Verificar ML API:
Abrir en navegador: http://localhost:8001
```json
{"message": "API ML - Clasificación de Trámites Municipales"}
```

### 3. Verificar Frontend:
Abrir: http://localhost:5173
Deberías ver la página de inicio con 3 opciones

### 4. Probar funcionalidad completa:
1. Clic en "Subir Trámite"
2. Ingresar email de prueba
3. Seleccionar tipo de trámite
4. Subir un archivo PDF o imagen
5. Verificar que se genere un ID
6. Consultar el estado con ese ID

---

## 🐛 Solución de Problemas

### Error: "No module named 'fastapi'"
```bash
pip install -r requirements.txt
```

### Error: "Can't connect to MySQL server"
- Verificar que MySQL esté corriendo en XAMPP
- Revisar credenciales en `.env`
- Verificar que la base de datos exista

### Error: "Tesseract not found"
- Instalar Tesseract OCR
- Agregar al PATH: `C:\Program Files\Tesseract-OCR`
- Reiniciar terminal

### Error: "Port 8000 already in use"
```bash
# Encontrar proceso usando el puerto
netstat -ano | findstr :8000

# Matar proceso (reemplazar PID)
taskkill /PID <numero_pid> /F
```

### Frontend no carga:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📧 Configurar Notificaciones Email (Opcional)

Para habilitar notificaciones por email, editar `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_app_password
```

**Nota**: Para Gmail, necesitas generar una "App Password":
1. Ir a: https://myaccount.google.com/security
2. Activar verificación en 2 pasos
3. Generar contraseña de aplicación

---

## 🎉 ¡Listo!

El sistema está completamente instalado y funcionando.

Para detener los servicios:
- Presionar `Ctrl + C` en cada terminal
- O cerrar las ventanas de los scripts .bat
