@echo off
echo ========================================
echo Sistema Municipal con IA
echo Municipalidad Provincial de Yau
echo ========================================
echo.
echo Este script iniciara los 3 servicios:
echo 1. Modelo ML (puerto 8001)
echo 2. Backend API (puerto 8000)
echo 3. Frontend React (puerto 5173)
echo.
echo Presiona cualquier tecla para continuar...
pause > nul

echo.
echo Iniciando servicios...
echo.

start "ML API" cmd /k "cd ml_model && venv\Scripts\activate && python api_ml.py"
timeout /t 3 > nul

start "Backend API" cmd /k "cd backend && venv\Scripts\activate && python main.py"
timeout /t 3 > nul

start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servicios iniciados!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo ML API:   http://localhost:8001
echo.
echo Presiona cualquier tecla para cerrar esta ventana
echo (Los servicios seguiran corriendo en sus ventanas)
pause > nul
