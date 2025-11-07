# 📤 Instrucciones para Subir a GitHub

## 🎯 Repositorio

**URL**: https://github.com/angel1701-lap/Entreglable.git

---

## 🚀 Método 1: Script Automático (Recomendado)

### Paso 1: Ejecutar Script
```bash
# Doble clic en:
GIT_PUSH.bat
```

### Paso 2: Push Manual
```bash
# Primera vez
git push -u origin main

# Actualizaciones posteriores
git push origin main
```

---

## 🔧 Método 2: Manual (Línea de Comandos)

### Paso 1: Verificar Git
```bash
git --version
```

Si no está instalado: https://git-scm.com/downloads

### Paso 2: Inicializar Repositorio
```bash
cd Proyecto1
git init
```

### Paso 3: Configurar Remote
```bash
git remote add origin https://github.com/angel1701-lap/Entreglable.git
```

### Paso 4: Agregar Archivos
```bash
git add .
```

### Paso 5: Commit
```bash
git commit -m "Sistema Municipal con IA - TensorFlow 2.0"
```

### Paso 6: Push
```bash
# Primera vez
git push -u origin main

# Si ya existe la rama
git push origin main

# Si hay conflictos (cuidado!)
git push -f origin main
```

---

## 🔐 Autenticación

### Opción 1: HTTPS (Recomendado)
```bash
# Te pedirá usuario y contraseña
git push origin main
```

### Opción 2: SSH
```bash
# Configurar SSH key primero
ssh-keygen -t ed25519 -C "tu_email@example.com"

# Agregar a GitHub: Settings → SSH Keys
# Cambiar remote a SSH
git remote set-url origin git@github.com:angel1701-lap/Entreglable.git
```

### Opción 3: Personal Access Token
```bash
# Generar token en GitHub: Settings → Developer settings → Personal access tokens
# Usar token como contraseña al hacer push
```

---

## 📋 Archivos que NO se Subirán (.gitignore)

✅ **Se suben**:
- Código fuente (Python, JavaScript, TypeScript)
- Documentación (MD, TXT)
- Scripts de instalación (.bat)
- Configuración de ejemplo (.env.example)
- SQL scripts

❌ **NO se suben**:
- `venv/` - Entornos virtuales
- `node_modules/` - Dependencias de Node
- `*.h5` - Modelos TensorFlow (muy grandes)
- `*.pkl` - Modelos serializados
- `.env` - Variables de entorno (secretos)
- `uploads/` - Archivos subidos por usuarios
- `__pycache__/` - Cache de Python

---

## 📦 Tamaño del Repositorio

**Estimado**: ~5-10 MB (sin modelos ML ni node_modules)

Los modelos ML (`.h5`, `.pkl`) no se suben porque:
- Son archivos grandes (~200 KB cada uno)
- Se generan automáticamente con `python train.py`
- Cada usuario debe entrenar su propio modelo

---

## 🔄 Actualizar el Repositorio

### Después de hacer cambios:

```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Commit
git commit -m "Descripción de los cambios"

# Push
git push origin main
```

---

## 🌿 Trabajar con Ramas

### Crear nueva rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### Cambiar de rama
```bash
git checkout main
```

### Merge de rama
```bash
git checkout main
git merge feature/nueva-funcionalidad
```

### Push de rama
```bash
git push origin feature/nueva-funcionalidad
```

---

## 📝 Mensajes de Commit Recomendados

```bash
# Nuevas características
git commit -m "feat: Agregar clasificación de urgencia"

# Correcciones
git commit -m "fix: Corregir error en predicción ML"

# Documentación
git commit -m "docs: Actualizar README con instrucciones"

# Refactorización
git commit -m "refactor: Mejorar estructura del código"

# Estilo
git commit -m "style: Formatear código con black"

# Tests
git commit -m "test: Agregar tests para modelo ML"
```

---

## 🐛 Solución de Problemas

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/angel1701-lap/Entreglable.git
```

### Error: "failed to push some refs"
```bash
# Opción 1: Pull primero
git pull origin main --rebase
git push origin main

# Opción 2: Forzar (cuidado!)
git push -f origin main
```

### Error: "Authentication failed"
```bash
# Usar Personal Access Token en lugar de contraseña
# Generar en: GitHub → Settings → Developer settings → Personal access tokens
```

### Error: "large files"
```bash
# Verificar .gitignore
# Remover archivos grandes del staging
git rm --cached archivo_grande.h5
git commit -m "Remover archivos grandes"
```

---

## 📊 Verificar Estado

### Ver archivos modificados
```bash
git status
```

### Ver historial de commits
```bash
git log --oneline
```

### Ver diferencias
```bash
git diff
```

### Ver remote configurado
```bash
git remote -v
```

---

## 🎯 Checklist Antes de Push

- [ ] Código funciona localmente
- [ ] Tests pasan (si existen)
- [ ] Documentación actualizada
- [ ] `.env` no está en el commit
- [ ] Modelos ML no están en el commit
- [ ] `node_modules/` no está en el commit
- [ ] Mensaje de commit descriptivo
- [ ] Remote configurado correctamente

---

## 📚 Recursos Adicionales

- **Git Docs**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

## 🆘 Ayuda

Si tienes problemas:

1. Verifica que Git esté instalado: `git --version`
2. Verifica el remote: `git remote -v`
3. Verifica el estado: `git status`
4. Consulta los logs: `git log`
5. Busca el error en Google o Stack Overflow

---

## ✅ Después del Push

1. Verifica en GitHub que los archivos se subieron
2. Actualiza el README si es necesario
3. Agrega una descripción al repositorio
4. Agrega topics/tags relevantes
5. Considera agregar una licencia (MIT recomendada)

---

**Repositorio**: https://github.com/angel1701-lap/Entreglable.git  
**Rama principal**: main  
**Estado**: ✅ Listo para push
