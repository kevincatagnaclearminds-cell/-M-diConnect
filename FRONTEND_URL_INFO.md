# 🌐 Información de URL del Frontend - MédiConnect

## 📍 URL del Frontend

### Desarrollo (Local)
```
http://localhost:3000
```

### Producción
```
https://tu-dominio.com
```
*(Reemplazar con tu dominio real cuando despliegues)*

---

## 🔗 URLs Específicas para el Backend

### 1. URL Base del Frontend
Usa esta URL para construir enlaces en correos electrónicos y redirecciones:

**Desarrollo:**
```
http://localhost:3000
```

**Producción:**
```
https://tu-dominio.com
```

---

### 2. URL de Recuperación de Contraseña

El backend debe enviar correos con enlaces en este formato:

**Desarrollo:**
```
http://localhost:3000/reset-password?token=TOKEN_AQUI
```

**Producción:**
```
https://tu-dominio.com/reset-password?token=TOKEN_AQUI
```

**Ejemplo completo:**
```
http://localhost:3000/reset-password?token=abc123xyz789def456
```

---

### 3. URL de Login (para redirecciones)

**Desarrollo:**
```
http://localhost:3000/login
```

**Producción:**
```
https://tu-dominio.com/login
```

---

### 4. URL de Home (después de login exitoso)

**Desarrollo:**
```
http://localhost:3000/
```

**Producción:**
```
https://tu-dominio.com/
```

---

## ⚙️ Configuración en el Backend

### Variable de Entorno

El backend debe tener una variable de entorno con la URL del frontend:

```env
# Desarrollo
FRONTEND_URL=http://localhost:3000

# Producción
FRONTEND_URL=https://tu-dominio.com
```

---

## 📧 Ejemplo de Uso en Correos

### Recuperación de Contraseña

```javascript
// En tu backend (Node.js ejemplo)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const resetToken = generateResetToken();
const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

// En el correo
const emailContent = `
  <h2>Recuperación de contraseña</h2>
  <p>Haz clic en el siguiente enlace:</p>
  <a href="${resetUrl}">Restablecer contraseña</a>
  <p>O copia este enlace: ${resetUrl}</p>
`;
```

---

## 🔒 CORS Configuration

El backend debe permitir requests desde el frontend. Configura CORS así:

### Node.js (Express) Ejemplo:
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Python (FastAPI) Ejemplo:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📝 Resumen Rápido

**Para desarrollo:**
- Frontend URL: `http://localhost:3000`
- Reset Password URL: `http://localhost:3000/reset-password?token=TOKEN`
- Login URL: `http://localhost:3000/login`

**Para producción:**
- Frontend URL: `https://tu-dominio.com`
- Reset Password URL: `https://tu-dominio.com/reset-password?token=TOKEN`
- Login URL: `https://tu-dominio.com/login`

---

## ✅ Checklist para el Backend

- [ ] Variable de entorno `FRONTEND_URL` configurada
- [ ] Enlaces de recuperación de contraseña usan `${FRONTEND_URL}/reset-password?token=...`
- [ ] CORS configurado para permitir requests desde el frontend
- [ ] Redirecciones después de login usan `${FRONTEND_URL}/`
- [ ] Redirecciones después de logout usan `${FRONTEND_URL}/login`

---

**Última actualización:** 2024

