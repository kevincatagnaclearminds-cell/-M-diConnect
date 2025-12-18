# 📋 Especificación de API para Backend - MédiConnect

Este documento contiene todas las especificaciones necesarias para que el backend se integre correctamente con el frontend de MédiConnect.

## 🔗 Base URL

```
http://localhost:3000/api
```

O la URL que se configure en la variable de entorno `VITE_API_BASE_URL`.

## 📡 Formato de Respuestas

Todas las respuestas de la API deben seguir este formato:

```typescript
{
  data: T,           // Datos de la respuesta
  message?: string,   // Mensaje opcional
  success: boolean    // true si fue exitoso, false si hubo error
}
```

### Respuestas de Error

Cuando hay un error, la respuesta debe tener `success: false` y el mensaje de error:

```json
{
  "data": null,
  "message": "Credenciales inválidas",
  "success": false
}
```

## 🔐 Endpoints de Autenticación

### 1. Login con Email y Contraseña

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Response Exitosa (200):**
```json
{
  "data": {
    "user": {
      "id": "user-id-123",
      "email": "usuario@ejemplo.com",
      "name": "Nombre Usuario",
      "avatar": "https://ejemplo.com/avatar.jpg",  // opcional
      "provider": "email"
    },
    "token": "jwt-token-aqui",
    "refreshToken": "refresh-token-aqui"  // opcional
  },
  "success": true
}
```

**Response Error (401):**
```json
{
  "data": null,
  "message": "Credenciales inválidas",
  "success": false
}
```

---

### 2. Registro de Usuario

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "nuevo@ejemplo.com",
  "password": "contraseña123",
  "name": "Nombre Completo"
}
```

**Response Exitosa (200):**
```json
{
  "data": {
    "user": {
      "id": "user-id-123",
      "email": "nuevo@ejemplo.com",
      "name": "Nombre Completo",
      "avatar": null,
      "provider": "email"
    },
    "token": "jwt-token-aqui",
    "refreshToken": "refresh-token-aqui"  // opcional
  },
  "success": true
}
```

**Response Error (400):**
```json
{
  "data": null,
  "message": "El email ya está registrado",
  "success": false
}
```

---

### 3. Login con Google

**Endpoint:** `POST /api/auth/google`

**Request Body:**
```json
{
  "token": "google-oauth-token-aqui"
}
```

**Response Exitosa (200):**
```json
{
  "data": {
    "user": {
      "id": "user-id-123",
      "email": "usuario@gmail.com",
      "name": "Nombre Usuario",
      "avatar": "https://lh3.googleusercontent.com/...",
      "provider": "google"
    },
    "token": "jwt-token-aqui",
    "refreshToken": "refresh-token-aqui"  // opcional
  },
  "success": true
}
```

**Response Error (401):**
```json
{
  "data": null,
  "message": "Token de Google inválido",
  "success": false
}
```

---

### 4. Solicitar Recuperación de Contraseña

**Endpoint:** `POST /api/auth/password-reset/request`

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Response Exitosa (200):**
```json
{
  "data": {
    "message": "Se ha enviado un enlace de recuperación a tu correo electrónico"
  },
  "success": true
}
```

**⚠️ IMPORTANTE - Envío de Correo:**

El backend DEBE enviar un correo electrónico al usuario con un enlace de recuperación. El enlace debe tener este formato:

```
http://tu-dominio.com/reset-password?token=TOKEN_DE_RECUPERACION
```

O si estás en desarrollo:
```
http://localhost:3000/reset-password?token=TOKEN_DE_RECUPERACION
```

**Ejemplo de correo a enviar:**

```
Asunto: Recuperación de contraseña - MédiConnect

Hola,

Has solicitado recuperar tu contraseña. Haz clic en el siguiente enlace para restablecerla:

http://tu-dominio.com/reset-password?token=abc123xyz789

Este enlace expirará en 1 hora.

Si no solicitaste este cambio, ignora este correo.

Saludos,
Equipo MédiConnect
```

**Response Error (404):**
```json
{
  "data": null,
  "message": "No se encontró una cuenta con ese email",
  "success": false
}
```

---

### 5. Resetear Contraseña con Token

**Endpoint:** `POST /api/auth/password-reset`

**Request Body:**
```json
{
  "token": "token-de-recuperacion-del-email",
  "newPassword": "nueva-contraseña123"
}
```

**Response Exitosa (200):**
```json
{
  "data": {
    "message": "Contraseña restablecida exitosamente"
  },
  "success": true
}
```

**Response Error (400):**
```json
{
  "data": null,
  "message": "Token inválido o expirado",
  "success": false
}
```

---

### 6. Cerrar Sesión

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer jwt-token-aqui
```

**Request Body:**
```json
{}
```

**Response Exitosa (200):**
```json
{
  "data": {},
  "success": true
}
```

---

### 7. Verificar Token

**Endpoint:** `GET /api/auth/verify`

**Headers:**
```
Authorization: Bearer jwt-token-aqui
```

**Response Exitosa (200):**
```json
{
  "data": {
    "valid": true
  },
  "success": true
}
```

**Response Error (401):**
```json
{
  "data": {
    "valid": false
  },
  "success": false
}
```

---

## 📝 Tipos TypeScript (Referencia)

Para referencia, estos son los tipos que el frontend espera:

```typescript
// User
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider?: 'email' | 'google';
}

// Auth Response
interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Login Credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Register Data
interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// Password Reset Request
interface PasswordResetRequest {
  email: string;
}

// Password Reset
interface PasswordReset {
  token: string;
  newPassword: string;
}
```

---

## 🔒 Autenticación con JWT

El frontend envía el token JWT en el header `Authorization`:

```
Authorization: Bearer jwt-token-aqui
```

El backend debe:
1. Validar el token en cada request protegido
2. Devolver 401 si el token es inválido o expirado
3. Extraer la información del usuario del token

---

## 📧 Configuración de Correo Electrónico

### Servicios Recomendados

- **Nodemailer** (Node.js) con Gmail SMTP
- **SendGrid**
- **Mailgun**
- **AWS SES**
- **Resend**

### Ejemplo con Nodemailer (Node.js)

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'tu-app-password' // Usar App Password de Gmail
  }
});

async function sendPasswordResetEmail(email, resetToken) {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  await transporter.sendMail({
    from: 'MédiConnect <noreply@mediconnect.com>',
    to: email,
    subject: 'Recuperación de contraseña - MédiConnect',
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Este enlace expirará en 1 hora.</p>
    `
  });
}
```

---

## ✅ Checklist de Implementación

- [ ] Endpoint `POST /api/auth/login` implementado
- [ ] Endpoint `POST /api/auth/register` implementado
- [ ] Endpoint `POST /api/auth/google` implementado
- [ ] Endpoint `POST /api/auth/password-reset/request` implementado
- [ ] **Envío de correo electrónico configurado y funcionando**
- [ ] Endpoint `POST /api/auth/password-reset` implementado
- [ ] Endpoint `POST /api/auth/logout` implementado
- [ ] Endpoint `GET /api/auth/verify` implementado
- [ ] JWT tokens implementados
- [ ] Validación de tokens en requests protegidos
- [ ] Manejo de errores con formato correcto
- [ ] CORS configurado para permitir requests del frontend

---

## 🧪 Testing

El frontend está configurado para trabajar en modo mock cuando no hay backend disponible. Para probar:

1. Inicia el backend en `http://localhost:3000/api`
2. Configura la variable de entorno en el frontend:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
3. El frontend detectará automáticamente el backend y dejará de usar mocks

---

## 📞 Soporte

Si tienes dudas sobre la implementación, revisa:
- Los tipos TypeScript en `src/features/auth/types/index.ts`
- El servicio de autenticación en `src/features/auth/services/authService.ts`
- El servicio API base en `src/services/api.ts`

---

## 🚀 Variables de Entorno Necesarias

El backend necesitará estas variables de entorno:

```env
# Base URL del frontend (para enlaces en correos y redirecciones)
# ⚠️ IMPORTANTE: Esta es la URL donde corre el frontend
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=tu-secret-key-super-segura
JWT_EXPIRES_IN=7d

# Base de datos
DATABASE_URL=tu-connection-string

# Email (ejemplo con Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password

# Google OAuth (para login con Google)
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

## 🌐 URL del Frontend

**URL Base del Frontend:**
- **Desarrollo:** `http://localhost:3000`
- **Producción:** `https://tu-dominio.com` (configurar según tu dominio)

**URLs Importantes:**
- Recuperación de contraseña: `${FRONTEND_URL}/reset-password?token=TOKEN`
- Login: `${FRONTEND_URL}/login`
- Home: `${FRONTEND_URL}/`

**Ver archivo `FRONTEND_URL_INFO.md` para más detalles.**

---

**Última actualización:** 2024

