@echo off
echo ========================================
echo Iniciando Frontend - React + Vite
echo ========================================
echo.

cd frontend

if not exist node_modules (
    echo Instalando dependencias...
    npm install
)

echo.
echo Iniciando servidor en http://localhost:5173
echo.
npm run dev

pause
