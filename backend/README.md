# Proyecto Around the U.S. - Backend

Esta es la API RESTful para la aplicación "Around the U.S.", diseñada para gestionar usuarios, tarjetas de imágenes y sistemas de autenticación.

## Tecnologías Utilizadas

- **Node.js & Express.js**: Entorno de ejecución y framework para el servidor.
- **MongoDB & Mongoose**: Base de datos NoSQL y modelado de esquemas.
- **Celebrate & Joi**: Validación estricta de parámetros y cuerpos de solicitudes.
- **Winston & Express-Winston**: Sistema de registro (logs) de tráfico y errores.
- **Bcryptjs & JSON Web Tokens (JWT)**: Cifrado de contraseñas y manejo de sesiones.

## Características Principales

- **Autenticación**: Registro e inicio de sesión seguros protegiendo rutas privadas.
- **Gestión de Usuarios**: Actualización de información de perfil y avatar con validación de URL personalizada.
- **Gestión de Tarjetas**: Creación, eliminación y sistema de "Me gusta" verificando la autorización del propietario.
- **Seguridad y Validación**: Bloqueo de peticiones malformadas antes de que alcancen los controladores.
- **Manejo Centralizado de Errores**: Captura global de fallos del servidor para devolver respuestas JSON estructuradas.
- **Logs Auditables**: Creación automática de historiales (`request.log` y `error.log`) para monitoreo del servidor.
