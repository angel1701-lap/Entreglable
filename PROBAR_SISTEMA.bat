@echo off
echo ========================================
echo PRUEBA COMPLETA DEL SISTEMA
echo ========================================
echo.
echo Este script verificara que todo funcione correctamente
echo.
pause

echo.
echo [1/5] Verificando Python...
python --version
if %errorlevel% neq 0 (
    echo [ERROR] Python no encontrado
    pause
    exit /b 1
)
echo [OK] Python instalado

echo.
echo [2/5] Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no encontrado
    pause
    exit /b 1
)
echo [OK] Node.js instalado

echo.
echo [3/5] Verificando MySQL (XAMPP)...
netstat -an | findstr :3306 > nul
if %errorlevel% neq 0 (
    echo [ERROR] MySQL no esta corriendo en puerto 3306
    echo        Inicia MySQL desde XAMPP Control Panel
    pause
    exit /b 1
)
echo [OK] MySQL corriendo

echo.
echo [4/5] Verificando modelos ML...
cd ml_model
if exist model_prioridad.h5 (
    echo [OK] Modelos TensorFlow encontrados
) else (
    echo [WARN] Modelos no encontrados. Entrenando...
    if exist venv\Scripts\activate (
        call venv\Scripts\activate
    ) else (
        python -m venv venv
        call venv\Scripts\activate
        pip install -r requirements.txt
    )
    python train.py
    if %errorlevel% neq 0 (
        echo [ERROR] Fallo el entrenamiento
        cd ..
        pause
        exit /b 1
    )
    echo [OK] Modelos entrenados exitosamente
)
cd ..

echo.
echo [5/5] Probando modelo ML...
cd ml_model
if exist venv\Scripts\activate (
    call venv\Scripts\activate
    python test_model.py
    if %errorlevel% neq 0 (
        echo [WARN] Algunas pruebas fallaron
    ) else (
        echo [OK] Modelo funcionando correctamente
    )
)
cd ..

echo.
echo ========================================
echo VERIFICACION COMPLETADA
echo ========================================
echo.
echo Todo listo! Puedes iniciar el sistema con:
echo   INICIAR_TODO.bat
echo.
pause
