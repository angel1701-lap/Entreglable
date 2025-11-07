# ❓ Preguntas Frecuentes (FAQ)

## 🔧 Instalación y Configuración

### ¿Qué necesito instalar antes de usar el sistema?
1. **XAMPP** (para MySQL)
2. **Python 3.8 o superior**
3. **Node.js 18 o superior**
4. **Tesseract OCR** (para reconocimiento de texto en imágenes)

### ¿Cómo sé si tengo todo instalado correctamente?
Ejecuta el script `VERIFICAR_SISTEMA.bat` que verificará todos los requisitos.

### ¿Puedo usar otro servidor MySQL en lugar de XAMPP?
Sí, solo necesitas editar el archivo `backend/.env` con tus credenciales:
```env
DB_HOST=tu_host
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=municipalidad_db
```

### ¿Dónde ejecuto el script init_db.sql?
En phpMyAdmin (http://localhost/phpmyadmin):
1. Clic en la pestaña "SQL"
2. Pega el contenido del archivo `backend/init_db.sql`
3. Clic en "Ejecutar"

---

## 🚀 Uso del Sistema

### ¿Cómo inicio el sistema?
Ejecuta `INICIAR_TODO.bat` que abrirá 3 ventanas (ML, Backend, Frontend).

### ¿Puedo iniciar solo una parte del sistema?
Sí, usa los scripts individuales:
- `start_ml.bat` - Solo modelo ML
- `start_backend.bat` - Solo backend
- `start_frontend.bat` - Solo frontend

### ¿Qué formatos de archivo puedo subir?
- PDF (.pdf)
- Imágenes JPG/JPEG (.jpg, .jpeg)
- Imágenes PNG (.png)

### ¿Cuál es el tamaño máximo de archivo?
Actualmente no hay límite configurado, pero se recomienda archivos menores a 10MB.

### ¿Cómo consulto el estado de mi trámite?
1. Guarda el ID que te dan al subir el documento
2. Ve a "Consultar Estado"
3. Ingresa tu ID
4. Verás el estado actual y la prioridad

---

## 🤖 Modelo de IA

### ¿Cómo funciona la clasificación automática?
El sistema usa **TensorFlow/Keras** con redes neuronales:
1. Extrae el texto del documento
2. Vectoriza con TF-IDF (100 features)
3. Pasa por red neuronal (64→32 neuronas)
4. Asigna una prioridad (alta/media/baja)
5. Clasifica el tipo de documento

### ¿Qué tan preciso es el modelo?
El modelo actual alcanza ~90-95% de accuracy (entrenado con 20 ejemplos). Para producción, debe reentrenarse con datos reales del municipio (mínimo 100 ejemplos por clase).

### ¿Puedo mejorar el modelo?
Sí, edita `ml_model/train.py` agregando más ejemplos y ejecuta:
```bash
cd ml_model
python train.py
```

Para más detalles, consulta `ml_model/README_TENSORFLOW.md`

### ¿Qué significa el nivel de confianza?
Es un porcentaje (0-100%) que indica qué tan seguro está el modelo de su predicción. Mayor confianza = predicción más confiable.

---

## 🔔 Notificaciones

### ¿Por qué no recibo emails?
Las notificaciones requieren configuración SMTP en `backend/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_app_password
```

### ¿Cómo obtengo una contraseña de aplicación de Gmail?
1. Ve a https://myaccount.google.com/security
2. Activa la verificación en 2 pasos
3. Busca "Contraseñas de aplicaciones"
4. Genera una nueva para "Correo"

### ¿Puedo usar otro servicio de email?
Sí, cambia `SMTP_HOST` y `SMTP_PORT` según tu proveedor:
- **Outlook**: smtp.office365.com:587
- **Yahoo**: smtp.mail.yahoo.com:587
- **Otros**: Consulta la documentación de tu proveedor

---

## 🐛 Problemas Comunes

### Error: "Port 8000 already in use"
Otro proceso está usando el puerto. Para solucionarlo:
```bash
netstat -ano | findstr :8000
taskkill /PID <numero> /F
```

### Error: "Can't connect to MySQL server"
1. Verifica que MySQL esté corriendo en XAMPP
2. Revisa las credenciales en `backend/.env`
3. Asegúrate de que la base de datos exista

### Error: "Tesseract not found"
1. Instala Tesseract OCR
2. Agrégalo al PATH del sistema
3. Reinicia la terminal

### Error: "Module not found"
```bash
# Backend
cd backend
pip install -r requirements.txt

# ML (TensorFlow puede tardar varios minutos)
cd ml_model
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### Error: "Could not load dynamic library 'cudart64_110.dll'"
TensorFlow está buscando GPU. Para usar solo CPU, agrega al inicio de `api_ml.py`:
```python
import os
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
```

### El frontend no carga estilos
```bash
cd frontend
npm install tailwindcss postcss autoprefixer
npm run dev
```

### Error al extraer texto de PDF
Algunos PDFs son imágenes escaneadas. El sistema intentará usar OCR automáticamente, pero asegúrate de tener Tesseract instalado.

---

## 💾 Base de Datos

### ¿Dónde se guardan los archivos subidos?
En la carpeta `backend/uploads/`

### ¿Cómo hago backup de la base de datos?
En phpMyAdmin:
1. Selecciona `municipalidad_db`
2. Clic en "Exportar"
3. Selecciona formato SQL
4. Descarga el archivo

### ¿Cómo restauro un backup?
1. Crea la base de datos vacía
2. Ve a "Importar"
3. Selecciona tu archivo .sql
4. Ejecuta

### ¿Puedo ver los datos directamente?
Sí, en phpMyAdmin o usando cualquier cliente MySQL como MySQL Workbench.

---

## 🔐 Seguridad

### ¿Es seguro para producción?
El sistema actual es para desarrollo/demostración. Para producción necesitas:
- Autenticación de usuarios
- HTTPS
- Rate limiting
- Validación de tamaño de archivos
- Encriptación de datos sensibles

### ¿Dónde se almacenan las contraseñas?
En el archivo `.env` que NO debe subirse a repositorios públicos (está en .gitignore).

### ¿Los documentos están encriptados?
No en la versión actual. Para producción, implementa encriptación de archivos.

---

## 📊 Dashboard y Reportes

### ¿Quién puede acceder al dashboard?
Actualmente cualquiera. En producción, implementa autenticación y roles.

### ¿Puedo exportar los datos?
No directamente desde la interfaz, pero puedes:
1. Usar phpMyAdmin para exportar
2. Consultar la API: `GET /api/v1/tramites`
3. Implementar exportación a Excel/PDF (mejora futura)

### ¿Cómo filtro los trámites?
Actualmente no hay filtros en la UI. Puedes:
1. Usar phpMyAdmin con queries SQL
2. Implementar filtros en el frontend (mejora futura)

---

## 🔄 Actualizaciones

### ¿Cómo actualizo el sistema?
1. Haz backup de la base de datos
2. Descarga la nueva versión
3. Ejecuta `INSTALAR.bat`
4. Restaura tus configuraciones en `.env`

### ¿Perderé mis datos al actualizar?
No, si haces backup de:
- Base de datos MySQL
- Carpeta `backend/uploads/`
- Archivo `backend/.env`

---

## 🎓 Aprendizaje

### ¿Dónde aprendo más sobre las tecnologías usadas?
- **React**: https://react.dev
- **FastAPI**: https://fastapi.tiangolo.com
- **Scikit-learn**: https://scikit-learn.org
- **TailwindCSS**: https://tailwindcss.com
- **SQLAlchemy**: https://www.sqlalchemy.org

### ¿Puedo modificar el código?
¡Sí! El proyecto es completamente personalizable. Consulta la documentación técnica en `RESUMEN_PROYECTO.md`.

### ¿Hay tutoriales disponibles?
Revisa los archivos:
- `INSTALACION.md` - Instalación paso a paso
- `GUIA_USO.md` - Cómo usar el sistema
- `RESUMEN_PROYECTO.md` - Arquitectura técnica

---

## 📞 Soporte

### ¿Dónde reporto bugs?
Revisa primero la sección "Solución de Problemas" en `INSTALACION.md`.

### ¿Cómo contribuyo al proyecto?
1. Haz un fork del repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Envía un pull request

### ¿Hay una comunidad?
Este es un proyecto de demostración. Para uso en producción, considera contratar desarrollo profesional.

---

## 💡 Consejos

### Para mejores resultados:
- Usa PDFs con texto seleccionable (no escaneados)
- Imágenes claras y legibles para OCR
- Emails válidos para notificaciones
- Guarda siempre el ID de tu trámite

### Optimización:
- Reinicia los servicios si notas lentitud
- Limpia la carpeta `uploads/` periódicamente
- Haz backup regular de la base de datos
- Monitorea el uso de recursos

---

¿No encontraste tu pregunta? Consulta `INSTALACION.md` o revisa los logs en las terminales de cada servicio.
