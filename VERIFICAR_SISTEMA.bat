@echo off
echo ========================================
echo Verificacion del Sistema
echo ========================================
echo.

echo Verificando Python...
python --version
if %errorlevel% neq 0 (
    echo [ERROR] Python no encontrado
) else (
    echo [OK] Python instalado
)
echo.

echo Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no encontrado
) else (
    echo [OK] Node.js instalado
)
echo.

echo Verificando npm...
npm --version
if %errorlevel% neq 0 (
    echo [ERROR] npm no encontrado
) else (
    echo [OK] npm instalado
)
echo.

echo Verificando Tesseract OCR...
tesseract --version
if %errorlevel% neq 0 (
    echo [WARN] Tesseract no encontrado (necesario para OCR de imagenes)
) else (
    echo [OK] Tesseract instalado
)
echo.

echo Verificando MySQL (XAMPP)...
netstat -an | findstr :3306 > nul
if %errorlevel% neq 0 (
    echo [ERROR] MySQL no esta corriendo en puerto 3306
    echo        Inicia MySQL desde XAMPP Control Panel
) else (
    echo [OK] MySQL corriendo en puerto 3306
)
echo.

echo Verificando archivos del proyecto...
if exist ml_model\requirements.txt (
    echo [OK] ml_model/requirements.txt
) else (
    echo [ERROR] ml_model/requirements.txt no encontrado
)

if exist backend\requirements.txt (
    echo [OK] backend/requirements.txt
) else (
    echo [ERROR] backend/requirements.txt no encontrado
)

if exist frontend\package.json (
    echo [OK] frontend/package.json
) else (
    echo [ERROR] frontend/package.json no encontrado
)

if exist backend\init_db.sql (
    echo [OK] backend/init_db.sql
) else (
    echo [ERROR] backend/init_db.sql no encontrado
)
echo.

echo ========================================
echo Verificacion completada
echo ========================================
echo.
echo Si todo esta OK, ejecuta: INSTALAR.bat
echo.
pause
