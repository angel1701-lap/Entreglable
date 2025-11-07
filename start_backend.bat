@echo off
echo ========================================
echo Iniciando Backend - API FastAPI
echo ========================================
echo.

cd backend

if not exist venv (
    echo Creando entorno virtual...
    python -m venv venv
)

echo Activando entorno virtual...
call venv\Scripts\activate

echo Instalando dependencias...
pip install -r requirements.txt

echo.
echo Iniciando servidor en http://localhost:8000
echo.
python main.py

pause
