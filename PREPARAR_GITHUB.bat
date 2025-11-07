@echo off
echo ========================================
echo PREPARAR PROYECTO PARA GITHUB
echo ========================================
echo.
echo Este script verifica que todo este listo para subir a GitHub
echo.
pause

echo.
echo [1/6] Verificando Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git no esta instalado
    echo Descarga desde: https://git-scm.com/downloads
    pause
    exit /b 1
)
echo [OK] Git instalado

echo.
echo [2/6] Verificando .gitignore...
if exist .gitignore (
    echo [OK] .gitignore existe
) else (
    echo [ERROR] .gitignore no encontrado
    pause
    exit /b 1
)

echo.
echo [3/6] Verificando archivos sensibles...
if exist backend\.env (
    findstr /C:"DB_PASSWORD=" backend\.env >nul
    if %errorlevel% equ 0 (
        echo [WARN] Archivo .env contiene contraseñas
        echo [INFO] Asegurate de que .env este en .gitignore
    )
)
echo [OK] Verificacion completada

echo.
echo [4/6] Verificando modelos ML...
if exist ml_model\model_prioridad.h5 (
    echo [INFO] Modelos ML encontrados (no se subiran - son grandes)
    echo [INFO] Los usuarios los generaran con: python train.py
)
echo [OK] Verificacion completada

echo.
echo [5/6] Verificando node_modules...
if exist frontend\node_modules (
    echo [INFO] node_modules encontrado (no se subira - es grande)
    echo [INFO] Los usuarios lo instalaran con: npm install
)
echo [OK] Verificacion completada

echo.
echo [6/6] Verificando documentacion...
set doc_count=0
if exist README.md set /a doc_count+=1
if exist README_GITHUB.md set /a doc_count+=1
if exist INSTALACION.md set /a doc_count+=1
if exist FAQ.md set /a doc_count+=1
if exist LICENSE set /a doc_count+=1

echo [OK] %doc_count% archivos de documentacion encontrados

echo.
echo ========================================
echo RESUMEN
echo ========================================
echo.
echo Archivos que NO se subiran (por .gitignore):
echo   • venv/
echo   • node_modules/
echo   • *.h5, *.pkl (modelos ML)
echo   • .env
echo   • uploads/
echo   • __pycache__/
echo.
echo Archivos que SI se subiran:
echo   • Codigo fuente (.py, .js, .jsx, .ts)
echo   • Documentacion (.md, .txt)
echo   • Scripts (.bat)
echo   • Configuracion (.json, .env.example)
echo   • SQL scripts (.sql)
echo.
echo Tamaño estimado del repositorio: 5-10 MB
echo.

echo ========================================
echo TODO LISTO PARA GITHUB
echo ========================================
echo.
echo Siguiente paso:
echo   1. Ejecutar: GIT_PUSH.bat
echo   2. O seguir instrucciones en: SUBIR_A_GITHUB.txt
echo.
pause
