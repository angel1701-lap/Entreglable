@echo off
echo ========================================
echo Instalacion Inicial - Sistema Municipal
echo ========================================
echo.
echo Este script instalara todas las dependencias
echo Asegurate de tener instalado:
echo - Python 3.8+
echo - Node.js 18+
echo - XAMPP (MySQL corriendo)
echo.
pause

echo.
echo [1/4] Instalando dependencias del Modelo ML (TensorFlow)...
echo NOTA: TensorFlow puede tardar 5-10 minutos en instalarse
cd ml_model
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate
echo Instalando TensorFlow y dependencias...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Fallo la instalacion de dependencias
    cd ..
    pause
    exit /b 1
)
echo Entrenando modelos TensorFlow...
python train.py
if %errorlevel% neq 0 (
    echo [ERROR] Fallo el entrenamiento del modelo
    cd ..
    pause
    exit /b 1
)
echo [OK] Modelos entrenados exitosamente
cd ..

echo.
echo [2/4] Instalando dependencias del Backend...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
if not exist .env (
    copy .env.example .env
    echo Archivo .env creado. Edita las credenciales si es necesario.
)
cd ..

echo.
echo [3/4] Instalando dependencias del Frontend...
cd frontend
call npm install
cd ..

echo.
echo [4/4] Creando carpeta de uploads...
if not exist backend\uploads mkdir backend\uploads

echo.
echo ========================================
echo Instalacion completada!
echo ========================================
echo.
echo IMPORTANTE: Antes de iniciar el sistema:
echo 1. Abre XAMPP y inicia MySQL
echo 2. Abre phpMyAdmin (http://localhost/phpmyadmin)
echo 3. Ejecuta el script: backend/init_db.sql
echo.
echo Luego ejecuta: INICIAR_TODO.bat
echo.
pause
