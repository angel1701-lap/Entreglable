# 📖 Guía de Uso - Sistema Municipal

## 👥 Para Ciudadanos

### 1. Subir un Trámite

1. Acceder a: http://localhost:5173
2. Clic en **"Subir Trámite"**
3. Completar formulario:
   - **Email**: Tu correo electrónico
   - **Tipo de trámite**: Seleccionar categoría
   - **Documento**: Subir PDF o imagen (JPG/PNG)
4. Clic en **"Enviar trámite"**
5. **Guardar el ID** que aparece (ej: A3F9B2)

### 2. Consultar Estado

1. Clic en **"Consultar Estado"**
2. Ingresar tu **ID de trámite**
3. Ver información:
   - Estado actual
   - Prioridad asignada
   - Fecha de registro

---

## 👨‍💼 Para Administradores

### Dashboard Municipal

1. Clic en **"Dashboard (Admin)"**
2. Ver lista completa de trámites
3. Información disponible:
   - ID único
   - Tipo de solicitud
   - Prioridad (Alta/Media/Baja)
   - Estado actual
   - Email del ciudadano
   - Fecha de registro

### Prioridades

- 🔴 **Alta**: Denuncias urgentes, reclamos críticos
- 🟡 **Media**: Licencias, CVs, solicitudes generales
- 🟢 **Baja**: Certificados, consultas simples

---

## 🤖 Cómo Funciona la IA

El sistema utiliza Machine Learning para:

1. **Extraer texto** del documento (PDF o imagen con OCR)
2. **Analizar contenido** usando procesamiento de lenguaje natural
3. **Clasificar automáticamente**:
   - Tipo de documento (licencia, CV, denuncia, etc.)
   - Nivel de prioridad (alta, media, baja)
4. **Asignar confianza** (0-100%) a la predicción

### Ejemplos de Clasificación

| Contenido | Tipo | Prioridad |
|-----------|------|-----------|
| "Solicitud de licencia de construcción urgente" | Licencia | Alta |
| "Curriculum vitae ingeniero civil" | CV | Media |
| "Reclamo por fuga de gas" | Reclamo | Alta |
| "Solicitud de certificado de residencia" | Certificado | Baja |

---

## 📊 Tipos de Documentos Soportados

### Formatos Aceptados
- ✅ PDF (.pdf)
- ✅ Imágenes JPG/JPEG (.jpg, .jpeg)
- ✅ Imágenes PNG (.png)

### Tipos de Trámites
1. **General**: Consultas y solicitudes diversas
2. **Licencia**: Permisos de construcción, funcionamiento
3. **Denuncia**: Quejas, reclamos, denuncias
4. **CV**: Postulaciones a empleos municipales
5. **Certificado**: Solicitudes de documentos oficiales

---

## 🔔 Notificaciones

Si el sistema está configurado con SMTP:
- Recibirás un email al registrar tu trámite
- Incluye tu ID único para consultas
- Información de prioridad asignada

---

## 💡 Consejos

### Para mejores resultados:

1. **Documentos claros**: Usar PDFs con texto seleccionable
2. **Imágenes nítidas**: Si subes fotos, que sean legibles
3. **Email válido**: Para recibir notificaciones
4. **Guardar ID**: Anótalo para consultas futuras

### Tiempos de procesamiento:

- Extracción de texto: 1-3 segundos
- Clasificación ML: < 1 segundo
- Registro en BD: < 1 segundo
- **Total**: ~5 segundos

---

## 🔐 Privacidad y Seguridad

- Los documentos se almacenan localmente
- El texto extraído se guarda en la base de datos
- Los emails solo se usan para notificaciones
- No se comparte información con terceros

---

## 📞 Soporte

Si tienes problemas:

1. Verificar que los 3 servicios estén corriendo
2. Revisar que XAMPP MySQL esté activo
3. Consultar logs en las terminales
4. Ver archivo `INSTALACION.md` para troubleshooting
