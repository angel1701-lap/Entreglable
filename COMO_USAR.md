# 🚀 Cómo Usar el Sistema - Guía Rápida

## ⚡ Primera Vez (Instalación Completa)

### 1️⃣ Verificar Requisitos
```bash
# Doble clic en:
VERIFICAR_SISTEMA.bat
```

**Necesitas tener instalado:**
- ✅ Python 3.8+
- ✅ Node.js 18+
- ✅ XAMPP (MySQL corriendo)
- ⚠️ Tesseract OCR (opcional, para imágenes)

---

### 2️⃣ Configurar Base de Datos

1. Abrir **XAMPP Control Panel**
2. Iniciar **MySQL**
3. Abrir **phpMyAdmin**: http://localhost/phpmyadmin
4. Ir a pestaña **SQL**
5. Copiar y pegar el contenido de: `backend/init_db.sql`
6. Clic en **Ejecutar**

---

### 3️⃣ Instalar Todo
```bash
# Doble clic en:
INSTALAR.bat
```

**⏱️ Tiempo estimado: 10-15 minutos**
- Instala dependencias del ML (TensorFlow ~5-10 min)
- Instala dependencias del Backend
- Instala dependencias del Frontend
- Entrena modelos ML

---

### 4️⃣ Probar Sistema (Opcional)
```bash
# Doble clic en:
PROBAR_SISTEMA.bat
```

Verifica que todo esté funcionando correctamente.

---

### 5️⃣ Iniciar Sistema
```bash
# Doble clic en:
INICIAR_TODO.bat
```

Se abrirán 3 ventanas:
- 🤖 ML API (puerto 8001)
- 🔧 Backend API (puerto 8000)
- 🎨 Frontend (puerto 5173)

**Acceder a**: http://localhost:5173

---

## 🔄 Usos Posteriores (Ya Instalado)

### Opción 1: Inicio Rápido
```bash
# Doble clic en:
INICIO_RAPIDO.bat
```

### Opción 2: Inicio Completo
```bash
# Doble clic en:
INICIAR_TODO.bat
```

---

## 🛑 Detener el Sistema

**Opción 1**: Cerrar las 3 ventanas que se abrieron

**Opción 2**: Presionar `Ctrl + C` en cada ventana

---

## 📁 Estructura de Scripts

```
Proyecto1/
├── VERIFICAR_SISTEMA.bat    → Verifica requisitos
├── INSTALAR.bat             → Instalación completa (primera vez)
├── PROBAR_SISTEMA.bat       → Prueba que todo funcione
├── INICIAR_TODO.bat         → Inicia los 3 servicios
├── INICIO_RAPIDO.bat        → Inicio rápido (ya instalado)
├── start_ml.bat             → Solo modelo ML
├── start_backend.bat        → Solo backend
└── start_frontend.bat       → Solo frontend
```

---

## 🌐 URLs del Sistema

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | http://localhost:5173 | Interfaz de usuario |
| **Backend** | http://localhost:8000 | API REST |
| **ML API** | http://localhost:8001 | Modelo TensorFlow |
| **phpMyAdmin** | http://localhost/phpmyadmin | Base de datos |

---

## 🎯 Flujo de Uso

### Para Ciudadanos:

1. **Subir Trámite**
   - Ir a http://localhost:5173
   - Clic en "Subir Trámite"
   - Completar formulario
   - Subir documento (PDF o imagen)
   - Guardar el ID generado

2. **Consultar Estado**
   - Clic en "Consultar Estado"
   - Ingresar ID del trámite
   - Ver estado y prioridad

### Para Administradores:

1. **Dashboard**
   - Clic en "Dashboard (Admin)"
   - Ver todos los trámites
   - Filtrar por prioridad
   - Ver información detallada

---

## ⚠️ Problemas Comunes

### MySQL no está corriendo
```
Solución:
1. Abrir XAMPP Control Panel
2. Clic en "Start" junto a MySQL
```

### Puerto ocupado (8000, 8001, 5173)
```
Solución:
1. Cerrar otras aplicaciones que usen esos puertos
2. O cambiar el puerto en la configuración
```

### Modelos no encontrados
```
Solución:
cd ml_model
python train.py
```

### Error de TensorFlow GPU
```
Solución:
Es normal si no tienes GPU NVIDIA.
El modelo funciona en CPU sin problemas.
```

---

## 📚 Documentación Completa

- **[README.md](README.md)** - Información técnica completa
- **[INSTALACION.md](INSTALACION.md)** - Guía detallada de instalación
- **[GUIA_USO.md](GUIA_USO.md)** - Manual de usuario
- **[FAQ.md](FAQ.md)** - Preguntas frecuentes
- **[ml_model/README_TENSORFLOW.md](ml_model/README_TENSORFLOW.md)** - Documentación del modelo ML

---

## 🆘 Ayuda Rápida

### Comando | Descripción
```
VERIFICAR_SISTEMA.bat  → ¿Tengo todo instalado?
INSTALAR.bat           → Primera instalación
PROBAR_SISTEMA.bat     → ¿Funciona todo?
INICIAR_TODO.bat       → Iniciar sistema
INICIO_RAPIDO.bat      → Inicio rápido
```

---

## ✅ Checklist de Primera Vez

- [ ] Python 3.8+ instalado
- [ ] Node.js 18+ instalado
- [ ] XAMPP instalado
- [ ] MySQL corriendo en XAMPP
- [ ] Base de datos creada (init_db.sql ejecutado)
- [ ] Ejecutado INSTALAR.bat
- [ ] Ejecutado PROBAR_SISTEMA.bat
- [ ] Ejecutado INICIAR_TODO.bat
- [ ] Accedido a http://localhost:5173

---

## 🎉 ¡Listo!

Tu sistema está funcionando. Ahora puedes:
- Subir trámites
- Consultar estados
- Ver el dashboard administrativo
- Probar la clasificación con IA

**¿Problemas?** Consulta [FAQ.md](FAQ.md)

---

**Versión**: 2.0  
**Framework ML**: TensorFlow 2.15  
**Estado**: ✅ Funcional
