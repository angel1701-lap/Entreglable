# 📧 Configuración de Email para Notificaciones

## Estado Actual

El sistema está funcionando en **MODO SIMULACIÓN** para los emails. Esto significa que:
- ✅ La funcionalidad de envío de mensajes funciona completamente
- ✅ Los mensajes se registran en los logs del backend
- ✅ No se requiere configuración de email para probar el sistema
- ⚠️ Los emails NO se envían realmente a los ciudadanos

## Cómo Configurar Email Real (Opcional)

Si deseas que los emails se envíen realmente, sigue estos pasos:

### Opción 1: Usar Gmail (Recomendado)

1. **Crear una Contraseña de Aplicación en Gmail:**
   - Ve a tu cuenta de Google: https://myaccount.google.com/
   - Seguridad → Verificación en 2 pasos (actívala si no está activa)
   - Seguridad → Contraseñas de aplicaciones
   - Selecciona "Correo" y "Otro (nombre personalizado)"
   - Escribe "Municipalidad Yau"
   - Copia la contraseña generada (16 caracteres)

2. **Configurar el archivo .env:**
   
   Edita el archivo `backend/.env` y agrega:
   
   ```env
   # Configuración de Email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=tu_email@gmail.com
   SMTP_PASSWORD=tu_contraseña_de_aplicacion_aqui
   ```

3. **Reiniciar el Backend:**
   ```bash
   # Detener el backend actual
   # Iniciar nuevamente
   cd backend
   .\venv\Scripts\python.exe main.py
   ```

### Opción 2: Usar Otro Proveedor de Email

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=tu_email@outlook.com
SMTP_PASSWORD=tu_contraseña
```

#### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=tu_email@yahoo.com
SMTP_PASSWORD=tu_contraseña_de_aplicacion
```

#### Servidor SMTP Personalizado
```env
SMTP_HOST=smtp.tuservidor.com
SMTP_PORT=587
SMTP_USER=tu_usuario
SMTP_PASSWORD=tu_contraseña
```

## Verificar Configuración

Una vez configurado, verifica que funciona:

1. **Revisa los logs del backend:**
   - Si ves: `[INFO] Mensaje personalizado enviado a...` → ✅ Funcionando
   - Si ves: `[WARN] Credenciales SMTP no configuradas` → ⚠️ Modo simulación

2. **Prueba enviando un mensaje:**
   - Accede al Dashboard (admin/admin123)
   - Click en "Mensaje" en cualquier trámite
   - Envía un mensaje de prueba
   - Revisa el email del destinatario

## Modo Simulación (Actual)

En modo simulación, los logs muestran:

```
[WARN] Credenciales SMTP no configuradas. Mensaje simulado.
[SIMULACIÓN] Email a: usuario@ejemplo.com
[SIMULACIÓN] Asunto: Actualización de su trámite #ABC123
[SIMULACIÓN] Mensaje: Estimado ciudadano, su trámite...
[SIMULACIÓN] Trámite ID: ABC123
```

Esto es útil para:
- ✅ Desarrollo y pruebas
- ✅ Demostración del sistema
- ✅ Evitar enviar emails reales durante pruebas

## Solución de Problemas

### Error: "Authentication failed"
- Verifica que la contraseña de aplicación sea correcta
- Asegúrate de tener la verificación en 2 pasos activa (Gmail)

### Error: "Connection refused"
- Verifica el SMTP_HOST y SMTP_PORT
- Revisa tu firewall

### Error: "Sender address rejected"
- Verifica que SMTP_USER sea un email válido
- Algunos proveedores requieren que el remitente sea el mismo que el usuario

## Recomendaciones de Seguridad

1. **Nunca compartas tu contraseña de aplicación**
2. **Usa variables de entorno (.env) para credenciales**
3. **No subas el archivo .env a repositorios públicos**
4. **Revoca contraseñas de aplicación que no uses**
5. **Considera usar servicios de email transaccional para producción:**
   - SendGrid
   - Mailgun
   - Amazon SES
   - Postmark

## Para Producción

En un entorno de producción, considera:

1. **Servicio de Email Transaccional:**
   - Mayor confiabilidad
   - Mejor deliverability
   - Analytics y tracking
   - Plantillas profesionales

2. **Rate Limiting:**
   - Limitar cantidad de emails por hora
   - Prevenir spam

3. **Queue de Emails:**
   - Procesar emails en background
   - Reintentos automáticos
   - Mejor rendimiento

4. **Monitoreo:**
   - Logs de emails enviados
   - Alertas de fallos
   - Métricas de entrega

---

**Nota:** El sistema funciona perfectamente en modo simulación para desarrollo y demostración. La configuración de email real es opcional y solo necesaria si deseas enviar emails reales a los ciudadanos.
