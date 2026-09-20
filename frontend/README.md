# Around the U.S. Auth - Autenticación y Rutas Privadas (TripleTen)

## 📌 Descripción del Proyecto

"Around the U.S." es una aplicación web interactiva diseñada para que los usuarios puedan gestionar un perfil personal y un feed de tarjetas con fotografías de paisajes.

Este proyecto representa la evolución de la aplicación original hacia una arquitectura moderna, escalable y segura. En esta nueva fase, la aplicación implementa un sistema completo de registro, inicio de sesión y protección de rutas mediante JWT (JSON Web Tokens), conectándose al backend de TripleTen para gestionar el acceso de los usuarios de forma real.

## 🚀 Tecnologías y Herramientas Utilizadas

- **React (JSX) & Vite:** Creación de interfaces de usuario mediante componentes modulares y entorno de desarrollo rápido.
- **React Router DOM:** Manejo de enrutamiento del lado del cliente (SPA) y navegación programática.
- **Context API (`CurrentUserContext`):** Gestión del estado global de la aplicación (datos del usuario logueado, cierre de sesión y funciones de la API).
- **JWT & Local Storage:** Persistencia de sesión segura en el navegador del usuario.
- **Fetch API (Async/Await):** Consumo del backend con una arquitectura de peticiones moderna, limpia y con manejo de errores robusto (`try/catch`).
- **ESLint:** Linter estándar implementado para mantener las mejores prácticas y limpieza en el código.
- **CSS3:** Estilos responsivos utilizando Flexbox, Grid y posicionamiento avanzado.

## 🛠️ Arquitectura y Nuevas Características

El proyecto fue refactorizado para adoptar un enfoque declarativo y seguro, destacando las siguientes implementaciones:

- **Rutas Protegidas (`ProtectedRoute`):** El feed principal y la edición de perfil ahora son exclusivos para usuarios logueados. Los usuarios anónimos son redirigidos automáticamente.
- **Sistema de Autenticación (`auth.js`):** Interacción directa con los endpoints `/signup`, `/signin` y `/users/me`.
- **Nuevos Componentes de Auth:** Formularios reutilizables para `Login.jsx` y `Register.jsx` con validaciones de seguridad.
- **InfoTooltip:** Un modal inteligente que proporciona retroalimentación visual (éxito o error específico) tras intentar registrarse o iniciar sesión.
- **Persistencia de Sesión:** Verificación automática del token al recargar la página, manteniendo al usuario conectado sin perder su estado.
- **Sistema de PopUps:** Contenedores modulares que renderizan diferentes formularios (`EditProfile`, `NewCard`, `ChangeAvatar`) basándose en el estado inyectado.
