# 🏗️ Arquitectura del Proyecto

## Estructura de Carpetas

### 📁 `src/`
Directorio principal del código fuente.

### 📁 `src/components/`
Componentes reutilizables de UI.
- `ui/` - Componentes base (Button, Input, Card, etc.)
- `layout/` - Componentes de layout (Header, Footer, Sidebar, etc.)

**Ejemplo:**
```typescript
import { Button } from '@components/ui/Button';
```

### 📁 `src/features/`
Arquitectura basada en features. Cada feature es un módulo autocontenido.
```
features/
└── [feature-name]/
    ├── components/    # Componentes específicos de la feature
    ├── hooks/         # Hooks específicos
    ├── services/      # Servicios/API calls específicos
    ├── types/         # Tipos TypeScript específicos
    └── index.ts       # Barrel export
```

**Ventajas:**
- Código organizado por funcionalidad
- Fácil de encontrar y mantener
- Escalable para proyectos grandes

### 📁 `src/pages/`
Páginas/vistas principales de la aplicación.

### 📁 `src/hooks/`
Custom hooks globales reutilizables.

### 📁 `src/services/`
Servicios para llamadas API y lógica de negocio.
- `api.ts` - Cliente API base

### 📁 `src/shared/`
Código compartido entre múltiples features.
- `constants/` - Constantes globales
- `helpers/` - Funciones helper
- `validators/` - Validadores reutilizables

### 📁 `src/types/`
Tipos TypeScript globales y interfaces compartidas.

### 📁 `src/utils/`
Utilidades generales (formateo, transformaciones, etc.)

### 📁 `src/styles/`
Estilos globales, temas y variables CSS.

### 📁 `src/assets/`
Recursos estáticos (imágenes, fuentes, iconos, etc.)

## 🎯 Path Aliases

Configurados en `tsconfig.json` y `vite.config.ts`:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@features/` → `src/features/`
- `@shared/` → `src/shared/`
- `@hooks/` → `src/hooks/`
- `@services/` → `src/services/`
- `@types/` → `src/types/`
- `@utils/` → `src/utils/`
- `@assets/` → `src/assets/`
- `@styles/` → `src/styles/`

**Uso:**
```typescript
// ✅ Bueno - usando path alias
import { Button } from '@components/ui/Button';
import { useLocalStorage } from '@hooks/useLocalStorage';
import type { ApiResponse } from '@types';

// ❌ Evitar - rutas relativas largas
import { Button } from '../../../components/ui/Button';
```

## 📝 Convenciones de Código

### Nombres de Archivos
- Componentes: `PascalCase.tsx` (ej: `Button.tsx`)
- Hooks: `camelCase.ts` con prefijo `use` (ej: `useLocalStorage.ts`)
- Utilidades: `camelCase.ts` (ej: `formatDate.ts`)
- Tipos: `camelCase.ts` o `index.ts` (ej: `types/index.ts`)

### Estructura de Componentes
```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@components/ui/Button';

// 2. Tipos/Interfaces
interface MyComponentProps {
  title: string;
}

// 3. Componente
export const MyComponent = ({ title }: MyComponentProps) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {};
  
  // 6. Render
  return <div>{title}</div>;
};
```

### Barrel Exports
Usar `index.ts` para exportar desde carpetas:
```typescript
// components/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

## 🔧 Configuración TypeScript

- **Strict mode**: Habilitado para máxima seguridad de tipos
- **Path aliases**: Configurados para imports limpios
- **Module resolution**: Bundler mode (Vite)
- **Target**: ES2020

## 🚀 Build y Desarrollo

- **Vite**: Build tool rápido con HMR
- **TypeScript**: Compilación estricta
- **ESLint**: Linting automático

## 📦 Agregar una Nueva Feature

1. Crear carpeta en `src/features/[feature-name]/`
2. Agregar estructura:
   ```
   [feature-name]/
   ├── components/
   ├── hooks/
   ├── services/
   ├── types/
   └── index.ts
   ```
3. Exportar desde `index.ts`
4. Usar en páginas o componentes

## 🎨 Estilos

- CSS modules o archivos CSS normales
- Variables CSS en `styles/` para temas
- Componentes pueden tener sus propios estilos

