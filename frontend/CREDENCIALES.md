# Credenciales de Acceso

## Panel de Administración

Para acceder al Dashboard administrativo, utilice las siguientes credenciales:

**Usuario:** `admin`  
**Contraseña:** `admin123`

## Cómo acceder

1. Haga clic en el botón "Admin" en el header
2. O navegue directamente desde la página de inicio
3. Ingrese las credenciales mencionadas arriba
4. Una vez autenticado, tendrá acceso al Dashboard con estadísticas y gestión de trámites

## Características del Sistema de Autenticación

- ✓ Login corporativo con diseño profesional
- ✓ Protección de rutas administrativas
- ✓ Sesión persistente durante la navegación
- ✓ Botón de cierre de sesión visible cuando está autenticado
- ✓ Redirección automática al Dashboard después del login

## Nota de Seguridad

En un entorno de producción, las credenciales deberían:
- Almacenarse de forma segura en una base de datos
- Usar hash de contraseñas (bcrypt, argon2, etc.)
- Implementar autenticación JWT o similar
- Agregar autenticación de dos factores (2FA)
