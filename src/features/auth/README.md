# 🔐 Feature de Autenticación

Esta feature contiene toda la lógica de autenticación de la aplicación, organizada siguiendo la arquitectura feature-based.

## 📁 Estructura

```
features/auth/
├── components/          # Componentes de UI
│   ├── LoginForm/      # Formulario de login
│   ├── GoogleButton/   # Botón de login con Google
│   └── PasswordResetForm/ # Formulario de recuperación
├── hooks/              # Custom hooks
│   └── useAuth.ts      # Hook principal de autenticación
├── services/           # Servicios API
│   └── authService.ts  # Cliente de API de autenticación
├── store/              # Estado global (Zustand)
│   └── authStore.ts    # Store de autenticación
├── types/              # Tipos TypeScript
│   └── index.ts        # Interfaces y tipos
└── index.ts            # Barrel exports
```

## 🚀 Uso

### Hook useAuth

```typescript
import { useAuth } from '@features/auth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    login, 
    logout, 
    loginWithGoogle 
  } = useAuth();

  const handleLogin = async () => {
    const result = await login({
      email: 'user@example.com',
      password: 'password123'
    });
    
    if (result.success) {
      // Login exitoso
    } else {
      // Mostrar error: result.error
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Bienvenido, {user?.name}</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Store de Zustand

```typescript
import { useAuthStore } from '@features/auth';

function MyComponent() {
  const { user, token, isAuthenticated, logout } = useAuthStore();
  
  // El store persiste automáticamente en localStorage
  // No necesitas llamar a useAuth() si solo necesitas leer el estado
}
```

### Servicio de Autenticación

```typescript
import { authService } from '@features/auth';

// Login directo (sin usar el hook)
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});
```

## 🔑 Funcionalidades

### ✅ Login con Email/Password
- Validación de formulario
- Manejo de errores
- Estado de carga

### ✅ Login con Google
- Botón de Google OAuth
- Integración lista (requiere configuración del backend)

### ✅ Recuperación de Contraseña
- Solicitud de reset
- Validación de email
- Mensajes de éxito/error

### ✅ Registro
- Función disponible en `useAuth().register()`
- Similar al login

## 🔧 Integración con Google OAuth

Para completar la integración con Google, necesitas:

1. **Instalar Google OAuth library:**
```bash
npm install @react-oauth/google
```

2. **Configurar en tu componente:**
```typescript
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '@features/auth';

function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();
  
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await loginWithGoogle(tokenResponse.access_token);
    },
    onError: () => {
      console.error('Error en login con Google');
    },
  });

  return <button onClick={handleGoogleLogin}>Login con Google</button>;
}
```

3. **Configurar en App.tsx:**
```typescript
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="TU_CLIENT_ID">
      {/* Tu app */}
    </GoogleOAuthProvider>
  );
}
```

## 📝 Notas

- El estado de autenticación se persiste automáticamente en `localStorage`
- Los tokens se almacenan de forma segura en el store
- Todas las llamadas API están tipadas con TypeScript
- Los errores se manejan de forma consistente

