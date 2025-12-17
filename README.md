# M-diConnect - Arquitectura Frontend Moderna

Arquitectura moderna de TypeScript para aplicación web frontend, siguiendo las mejores prácticas y patrones escalables.

## 🏗️ Estructura del Proyecto

```
src/
├── assets/          # Recursos estáticos (imágenes, fuentes, etc.)
├── components/      # Componentes reutilizables
│   ├── ui/         # Componentes de UI base (Button, Input, etc.)
│   └── layout/     # Componentes de layout (Header, Footer, etc.)
├── features/       # Módulos por funcionalidad (Feature-based architecture)
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
├── hooks/          # Custom hooks globales
├── pages/          # Páginas/vistas de la aplicación
├── services/       # Servicios de API y lógica de negocio
├── shared/         # Código compartido entre features
│   ├── constants/
│   ├── helpers/
│   └── validators/
├── styles/         # Estilos globales y temas
├── types/          # Tipos TypeScript globales
├── utils/          # Utilidades generales
└── main.tsx        # Punto de entrada
```

## 🚀 Tecnologías

- **TypeScript** - Tipado estático
- **Vite** - Build tool rápido
- **React** - Framework UI (opcional, puede ser vanilla TS)
- **ESLint** - Linter para código limpio

## 📦 Instalación

```bash
npm install
```

## 🛠️ Scripts

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción
- `npm run lint` - Ejecuta el linter
- `npm run type-check` - Verifica tipos TypeScript

## 🎯 Características de la Arquitectura

### Path Aliases
Configurados para imports limpios:
- `@/` → `src/`
- `@components/` → `src/components/`
- `@features/` → `src/features/`
- `@shared/` → `src/shared/`
- Y más...

### Feature-Based Architecture
Cada feature es un módulo autocontenido con sus propios componentes, hooks, servicios y tipos.

### TypeScript Estricto
Configuración estricta para máxima seguridad de tipos.

## 📝 Convenciones

- Usar path aliases para imports
- Organizar código por features cuando sea posible
- Componentes reutilizables en `components/`
- Tipos compartidos en `types/`
- Utilidades en `utils/` o `shared/helpers/`

