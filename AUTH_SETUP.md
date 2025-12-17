# 🔐 Guía de Configuración de Autenticación

## 📦 Dependencias Instaladas

Las siguientes dependencias han sido agregadas al proyecto:

- **zustand** (^4.4.7) - Gestión de estado global
- **react-router-dom** (^6.21.1) - Enrutamiento
- **react-icons** (^5.2.0) - Iconos (Google, Email, Lock, etc.)

## 🏗️ Estructura Creada

### Feature de Autenticación (`src/features/auth/`)

La autenticación está organizada como una feature completa:

```
features/auth/
├── components/          # Componentes UI
│   ├── LoginForm/       # Formulario principal de login
│   ├── GoogleButton/    # Botón de login con Google
│   └── PasswordResetForm/ # Recuperación de contraseña
├── hooks/
│   └── useAuth.ts       # Hook principal con todas las funciones
├── services/
│   └── authService.ts   # Cliente API para autenticación
├── store/
│   └── authStore.ts     # Store de Zustand (estado persistente)
└── types/
    └── index.ts         # Tipos TypeScript
```

### Componentes UI Creados

- **Input** (`src/components/ui/Input/`) - Input reutilizable con iconos y validación
- **Button** - Ya existía, se mantiene

## 🚀 Cómo Usar

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Ejecutar la Aplicación

```bash
npm run dev
```

La aplicación abrirá en `http://localhost:3000` y redirigirá a `/login` si no estás autenticado.

### 3. Página de Login

La página de login (`src/pages/Login.tsx`) incluye:

- ✅ Login con Google (botón configurado, requiere integración OAuth)
- ✅ Login con Email/Password
- ✅ Recuperación de contraseña
- ✅ Link a registro (pendiente de implementar)

## 🔧 Configuración del Backend

Las llamadas API esperan los siguientes endpoints:

### Login
```
POST /api/auth/login
Body: { email: string, password: string }
Response: { data: { user: User, token: string }, success: boolean }
```

### Registro
```
POST /api/auth/register
Body: { email: string, password: string, name: string }
Response: { data: { user: User, token: string }, success: boolean }
```

### Login con Google
```
POST /api/auth/google
Body: { token: string }
Response: { data: { user: User, token: string }, success: boolean }
```

### Recuperación de Contraseña
```
POST /api/auth/password-reset/request
Body: { email: string }
Response: { data: { message: string }, success: boolean }
```

### Reset de Contraseña
```
POST /api/auth/password-reset
Body: { token: string, newPassword: string }
Response: { data: { message: string }, success: boolean }
```

## 🔑 Integración con Google OAuth

Para completar la integración con Google:

1. **Instalar la librería:**
```bash
npm install @react-oauth/google
```

2. **Obtener Client ID de Google:**
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto o selecciona uno existente
   - Habilita Google+ API
   - Crea credenciales OAuth 2.0
   - Copia el Client ID

3. **Actualizar `LoginForm.tsx`:**
   - Reemplazar el `handleGoogleLogin` con la implementación real usando `@react-oauth/google`

4. **Configurar en `App.tsx`:**
   - Envolver la app con `GoogleOAuthProvider`

## 📝 Estado de Autenticación (Zustand)

El estado se persiste automáticamente en `localStorage`:

```typescript
import { useAuthStore } from '@features/auth';

// Leer estado
const { user, isAuthenticated, token } = useAuthStore();

// Acciones (mejor usar useAuth hook)
const { login, logout } = useAuth();
```

## 🎨 Personalización

### Estilos
- Los estilos están en archivos `.css` junto a cada componente
- Puedes modificar colores, tamaños, etc. en estos archivos
- El tema principal está en `src/pages/Login.css`

### Validaciones
- Las validaciones están en `LoginForm.tsx`
- Puedes agregar más reglas según tus necesidades

## ✅ Próximos Pasos

1. **Implementar página de Registro** - Similar a Login
2. **Completar integración Google OAuth** - Seguir guía arriba
3. **Agregar protección de rutas** - Ya configurado en `App.tsx`
4. **Implementar refresh token** - Si tu backend lo soporta
5. **Agregar manejo de errores global** - Toast notifications, etc.

## 🐛 Troubleshooting

### Error: "Cannot find module 'react-icons'"
```bash
npm install react-icons
```

### Error: "Cannot find module 'zustand'"
```bash
npm install zustand
```

### El estado no persiste
- Verifica que `persist` middleware esté configurado en `authStore.ts`
- Revisa la consola del navegador para errores de localStorage

