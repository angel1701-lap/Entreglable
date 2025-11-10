# 📧 Guía Rápida: Enviar Emails Reales

## Resumen en 4 Pasos

1. ✅ Obtener contraseña de aplicación de Gmail
2. ✅ Editar archivo `.env`
3. ✅ Reiniciar el backend
4. ✅ Probar enviando un mensaje

---

## Paso 1: Obtener Contraseña de Gmail

### Opción A: Si ya tienes verificación en 2 pasos

1. Ve a: https://myaccount.google.com/apppasswords
2. Inicia sesión con tu Gmail
3. En "Seleccionar app": Elige **Correo**
4. En "Seleccionar dispositivo": Elige **Otro**
5. Escribe: **Municipalidad Yau**
6. Click en **Generar**
7. **COPIA** la contraseña de 16 caracteres (ejemplo: `abcd efgh ijkl mnop`)

### Opción B: Si NO tienes verificación en 2 pasos

1. Ve a: https://myaccount.google.com/security
2. Busca "Verificación en 2 pasos"
3. Click en **Comenzar**
4. Sigue los pasos (te pedirá tu teléfono)
5. Una vez activada, ve a la Opción A

---

## Paso 2: Editar el Archivo .env

### Ubicación del archivo:
```
Proyecto1/backend/.env
```

### Qué editar:

**ANTES:**
```env
SMTP_USER=
SMTP_PASSWORD=
```

**DESPUÉS:**
```env
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
```

### Ejemplo Real:
```env
SMTP_USER=municipalidad.yau@gmail.com
SMTP_PASSWORD=xyzw abcd efgh ijkl
```

### ⚠️ IMPORTANTE:
- Usa tu email REAL de Gmail
- Usa la contraseña de APLICACIÓN (16 caracteres)
- NO uses tu contraseña normal de Gmail
- Puedes dejar los espacios o quitarlos (ambos funcionan)

---

## Paso 3: Reiniciar el Backend

### Opción 1: Automática (Recomendada)

1. Cierra todas las ventanas del sistema
2. Ejecuta: `INICIO_RAPIDO.bat`
3. Espera a que todos los servicios inicien

### Opción 2: Manual

1. Ve a la ventana del backend
2. Presiona `Ctrl + C` para detenerlo
3. Ejecuta:
   ```bash
   cd backend
   .\venv\Scripts\python.exe main.py
   ```

---

## Paso 4: Probar el Envío

### 1. Accede al Dashboard
- URL: http://localhost:5173
- Click en "Admin"
- Login: `admin` / `admin123`

### 2. Envía un Mensaje de Prueba
- En la lista de trámites, click en **"Mensaje"**
- Escribe un mensaje de prueba
- Click en **"Enviar Mensaje"**

### 3. Verifica el Resultado

**En el Frontend:**
- Deberías ver: ✅ "Mensaje enviado exitosamente"

**En los Logs del Backend:**
- Si funciona: `[INFO] Mensaje personalizado enviado a usuario@ejemplo.com`
- Si no funciona: `[WARN] Credenciales SMTP no configuradas`

**En el Email del Destinatario:**
- Revisa la bandeja de entrada
- Busca un email de tu cuenta de Gmail
- Asunto: "Actualización de su trámite #..."

---

## Solución de Problemas

### Error: "Authentication failed"

**Causa:** Contraseña incorrecta

**Solución:**
1. Verifica que copiaste bien la contraseña de aplicación
2. Asegúrate de NO usar tu contraseña normal de Gmail
3. Genera una nueva contraseña de aplicación

### Error: "Credenciales SMTP no configuradas"

**Causa:** El archivo .env no se guardó correctamente

**Solución:**
1. Abre `backend/.env`
2. Verifica que SMTP_USER y SMTP_PASSWORD tengan valores
3. Guarda el archivo
4. Reinicia el backend

### Error: "Connection refused"

**Causa:** Firewall o configuración de red

**Solución:**
1. Verifica tu conexión a internet
2. Desactiva temporalmente el firewall
3. Verifica que SMTP_HOST sea `smtp.gmail.com`
4. Verifica que SMTP_PORT sea `587`

### El email no llega

**Posibles causas:**
1. Revisa la carpeta de SPAM
2. Verifica que el email del destinatario sea correcto
3. Espera unos minutos (puede tardar)
4. Revisa los logs del backend para confirmar que se envió

---

## Verificar Configuración Actual

Ejecuta el script:
```bash
PROBAR_EMAIL.bat
```

Este script te mostrará:
- Si el archivo .env existe
- La configuración actual de SMTP
- Si está configurado o no

---

## Ejemplo Completo de .env

```env
# Base de datos MySQL (XAMPP)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=municipalidad_db

# API ML
ML_API_URL=http://localhost:8001

# Email (CONFIGURADO)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=municipalidad.yau@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
```

---

## Alternativas a Gmail

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=tu_email@outlook.com
SMTP_PASSWORD=tu_contraseña
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=tu_email@yahoo.com
SMTP_PASSWORD=tu_contraseña_de_aplicacion
```

---

## Preguntas Frecuentes

### ¿Es seguro poner mi contraseña en el .env?

Sí, siempre que:
- Uses una contraseña de APLICACIÓN (no tu contraseña principal)
- No subas el archivo .env a repositorios públicos
- El archivo .env está en .gitignore

### ¿Puedo usar mi email personal?

Sí, puedes usar cualquier cuenta de Gmail. Para producción se recomienda crear una cuenta específica para la municipalidad.

### ¿Cuántos emails puedo enviar?

Gmail permite aproximadamente:
- 500 emails por día (cuenta gratuita)
- 2000 emails por día (Google Workspace)

### ¿Qué pasa si no configuro el email?

El sistema funciona perfectamente en modo simulación. Los mensajes se registran en los logs pero no se envían realmente.

---

## Resumen Visual

```
┌─────────────────────────────────────────┐
│  1. Obtener contraseña de Gmail         │
│     https://myaccount.google.com/       │
│     apppasswords                        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  2. Editar backend/.env                 │
│     SMTP_USER=tu_email@gmail.com        │
│     SMTP_PASSWORD=abcdefghijklmnop      │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  3. Reiniciar backend                   │
│     Ctrl+C → python main.py             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  4. Probar en Dashboard                 │
│     admin/admin123 → Mensaje            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  ✅ Email enviado!                      │
└─────────────────────────────────────────┘
```

---

**¿Necesitas ayuda?** Revisa los logs del backend para ver mensajes de error detallados.
