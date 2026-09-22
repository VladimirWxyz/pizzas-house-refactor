# Pizzas House · aplicación web

Refactor de la web comercial a React, Vinext y TypeScript. La versión monolítica usada como referencia permanece en `../separated/pizzas-house-web/index.html` y no forma parte del código de la aplicación.

## Scripts

- `npm run dev`: servidor local con recarga en vivo.
- `npm run typecheck`: validación estricta de TypeScript.
- `npm run lint`: reglas de ESLint y accesibilidad de React.
- `npm run build`: compilación de producción.
- `npm run check`: ejecuta tipos, lint y build.

## Estructura

- `app/`: entrada, metadata y estilos globales.
- `components/layout/`: cabecera y pie.
- `components/sections/`: cada sección visual de la página.
- `components/catalog/`: catálogo, tarjetas, extras y bebidas.
- `components/order/`: carrito, formulario y diálogos del pedido.
- `context/`: estado y reglas del flujo de compra.
- `data/`: catálogo y configuración comercial.
- `lib/`: cálculos y formato sin interfaz.
- `types/`: contratos TypeScript.
- `styles/`: apariencia original y ajustes de integración.

Los recursos visuales se reutilizan desde la copia de referencia mediante `public/assets` para evitar duplicados y mantener una única fuente de imágenes.
