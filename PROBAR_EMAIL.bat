@echo off
cls
echo.
echo  ╔════════════════════════════════════════════════════════════╗
echo  ║                                                            ║
echo  ║     PROBAR CONFIGURACION DE EMAIL                          ║
echo  ║     Municipalidad Provincial de Yau                        ║
echo  ║                                                            ║
echo  ╚════════════════════════════════════════════════════════════╝
echo.
echo  Este script te ayudará a verificar si el email está configurado
echo.
pause

echo.
echo  Verificando archivo .env...
if not exist backend\.env (
    echo  [ERROR] No se encuentra el archivo backend\.env
    pause
    exit /b 1
)

echo  [OK] Archivo .env encontrado
echo.
echo  Mostrando configuración actual:
echo  ════════════════════════════════════════════════════════════
type backend\.env | findstr SMTP
echo  ════════════════════════════════════════════════════════════
echo.
echo  ¿Está configurado SMTP_USER y SMTP_PASSWORD?
echo.
echo  Si ves valores vacíos, necesitas configurarlos.
echo  Si ves tu email y contraseña, está listo!
echo.
echo  Para configurar:
echo  1. Abre: backend\.env
echo  2. Edita SMTP_USER con tu email de Gmail
echo  3. Edita SMTP_PASSWORD con tu contraseña de aplicación
echo  4. Guarda el archivo
echo  5. Reinicia el backend
echo.
pause
