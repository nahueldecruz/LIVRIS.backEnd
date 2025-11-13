# LIVRIS - Backend

## DESCRIPCIÓN:
"LiVris" es una red social para lectores donde los usuarios pueden interactuar con libros obtenidos mediante la **API de Google Books**.  
En esta parte del proyecto (backend), se manejan funcionalidades como:

- Gestión de usuarios (registro, login, perfil).  
- Gestión de libros en la base de datos.  
- Creación y visualización de reseñas de libros.  
- Relación entre usuarios y libros (listas de lectura, favoritos, etc.).  

Se utiliza Node.js con Express y MySQL como base de datos.

---

## TECNOLOGÍAS UTILIZADAS:
- **Node.js**  
- **Express**  
- **MySQL**  
- **JWT** para autenticación  
- **bcrypt** para encriptación de contraseñas  
- **Dotenv** para variables de entorno  
- **Cors** para manejo de requests desde el frontend  

---

## INSTALACIÓN:

1. Clona el repositorio:
   git clone https://github.com/nahueldecruz/LIVRIS.backEnd.git
2. Ingresa a la carpeta del proyecto
3. Instala dependencias:
    npm install
4. Configurar variables de entorno:
    MYSQL_HOST
    MYSQL_DATABASE
    MYSQL_USERNAME
    MYSQL_PASSWORD
    GMAIL_PASSWORD
    GMAIL_USER
    JWT_VERIFICATION_SECRET_KEY
    JWT_RESET_SECRET_KEY
    URL_API
    URL_FRONTEND
    URL_API_GOOGLE_BOOKS
5. Levanta la app:
    npm run dev

## ENDPOINTS PRINCIPALES:
- **Autenticación**
    POST /api/auth/register - Registrar un usuario en la DB.
    POST /api/auth/login - Obtener la información de sesión.
    GET /api/auth/verify-email/:verification_token - Verificar el email con el token de verificación.
    POST /api/auth/forgot-password - Envía email de recuperación de contraseña.
    PUT /api/auth/reset-password/:reset_token - Actualiza la contraseña.

- **Usuarios**
    GET /api/users/:user_id – Obtener información de un usuario específico.

- **Libros**
    GET /api/books – Obtener todos los libros.
    GET /api/books/search – Obtener todos los libros de la Google Books APIs.
    GET /api/books/:book_id – Obtener información de un libro por ID.
    POST /api/books/save-book – Agregar un libro a la DB.

- **Reseñas**
    GET /api/reviews/:review_id – Obtener información de reseña por ID.
    GET /api/reviews/book/:book_id – Obtener reseñas de un libro.
    GET /api/reviews/user/:user_id – Obtener reseñas de un usuario.
    GET /api/reviews/:user_id/:book_id – Obtener reseñas de un libro especifico que hizo un usuario especifico.
    POST /api/reviews/new-review – Crear una reseña de un libro.
