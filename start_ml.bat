@echo off
echo ========================================
echo Iniciando Modelo ML - API
echo ========================================
echo.

cd ml_model

if not exist venv (
    echo Creando entorno virtual...
    python -m venv venv
)

echo Activando entorno virtual...
call venv\Scripts\activate

echo Instalando dependencias...
pip install -r requirements.txt

echo.
echo Verificando modelos TensorFlow...
if not exist model_prioridad.h5 (
    echo Entrenando modelos...
    python train.py
) else (
    echo Modelos encontrados.
)

echo.
echo Iniciando API ML en http://localhost:8001
echo Framework: TensorFlow/Keras
echo.
python api_ml.py

pause
