@echo off
cls
echo.
echo  ╔════════════════════════════════════════════════════════════╗
echo  ║                                                            ║
echo  ║     SISTEMA MUNICIPAL CON IA - INICIO RAPIDO              ║
echo  ║     Municipalidad Provincial de Yau                       ║
echo  ║                                                            ║
echo  ╚════════════════════════════════════════════════════════════╝
echo.
echo  Este script es para usuarios que YA tienen:
echo    ✓ Dependencias instaladas
echo    ✓ Modelos entrenados
echo    ✓ MySQL corriendo
echo.
echo  Si es tu primera vez, usa: INSTALAR.bat
echo.
pause

echo.
echo  Verificando MySQL...
netstat -an | findstr :3306 > nul
if %errorlevel% neq 0 (
    echo  [ERROR] MySQL no esta corriendo
    echo  Por favor inicia MySQL desde XAMPP Control Panel
    pause
    exit /b 1
)
echo  [OK] MySQL corriendo

echo.
echo  Verificando modelos ML...
if not exist ml_model\model_prioridad.h5 (
    echo  [ERROR] Modelos no encontrados
    echo  Ejecuta primero: INSTALAR.bat
    pause
    exit /b 1
)
echo  [OK] Modelos encontrados

echo.
echo  ════════════════════════════════════════════════════════════
echo  Iniciando servicios...
echo  ════════════════════════════════════════════════════════════
echo.

start "ML API (TensorFlow)" cmd /k "cd ml_model && venv\Scripts\activate && python api_ml.py"
timeout /t 3 > nul

start "Backend API (FastAPI)" cmd /k "cd backend && venv\Scripts\activate && python main.py"
timeout /t 3 > nul

start "Frontend (React)" cmd /k "cd frontend && npm run dev"

echo.
echo  ════════════════════════════════════════════════════════════
echo  ✓ Servicios iniciados!
echo  ════════════════════════════════════════════════════════════
echo.
echo  URLs:
echo    Frontend:  http://localhost:5173
echo    Backend:   http://localhost:8000
echo    ML API:    http://localhost:8001
echo.
echo  Presiona cualquier tecla para cerrar esta ventana
echo  (Los servicios seguiran corriendo)
pause > nul
