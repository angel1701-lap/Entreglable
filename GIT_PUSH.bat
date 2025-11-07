@echo off
echo ========================================
echo SUBIR PROYECTO A GITHUB
echo ========================================
echo.
echo Repositorio: https://github.com/angel1701-lap/Entreglable.git
echo.
pause

echo.
echo [1/5] Verificando Git...
git --version
if %errorlevel% neq 0 (
    echo [ERROR] Git no esta instalado
    echo Descarga Git desde: https://git-scm.com/downloads
    pause
    exit /b 1
)
echo [OK] Git instalado

echo.
echo [2/5] Inicializando repositorio (si no existe)...
if not exist .git (
    git init
    echo [OK] Repositorio inicializado
) else (
    echo [OK] Repositorio ya existe
)

echo.
echo [3/5] Configurando remote...
git remote remove origin 2>nul
git remote add origin https://github.com/angel1701-lap/Entreglable.git
echo [OK] Remote configurado

echo.
echo [4/5] Agregando archivos...
git add .
echo [OK] Archivos agregados

echo.
echo [5/5] Haciendo commit...
set /p commit_msg="Ingresa el mensaje del commit (o presiona Enter para usar mensaje por defecto): "
if "%commit_msg%"=="" set commit_msg=Actualizacion del sistema con TensorFlow 2.0

git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo [WARN] No hay cambios para commitear o ya se hizo commit
)

echo.
echo ========================================
echo LISTO PARA PUSH
echo ========================================
echo.
echo Ahora ejecuta uno de estos comandos:
echo.
echo   git push -u origin main          (primera vez)
echo   git push origin main             (actualizaciones)
echo   git push -f origin main          (forzar - cuidado!)
echo.
echo Si es tu primera vez, puede que necesites autenticarte.
echo.
pause
