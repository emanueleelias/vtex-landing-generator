# AGENT.md

Guía para agentes que trabajen en `vtex-landing-generator`.

## Resumen
- Proyecto: constructor visual de landings VTEX IO en formato JSON/JSONC.
- Stack: React 18 + TypeScript + Vite + Tailwind CSS + Zustand.
- Objetivo funcional: armar un árbol de componentes VTEX IO nativos (drag & drop) y copiar al portapapeles la configuración VTEX.

## Comandos de trabajo
- Instalar dependencias: `pnpm install`
- Desarrollo local: `pnpm dev`
- Build producción: `pnpm build`
- Preview build: `pnpm preview`

Nota: no hay tests automáticos configurados actualmente.

## Estructura clave
- `src/engine/types.ts`: tipos base del sistema (`VtexComponentDefinition`, `PropSchema`, `TreeNode`).
- `src/engine/vtexComponents.ts`: registro central de componentes VTEX soportados y sus `propsSchema`.
- `src/store/landingStore.ts`: estado global (`landingName`, `tree`, selección, tema, acciones CRUD y DnD).
- `src/components/BlockLibrary.tsx`: panel izquierdo con componentes VTEX agrupados por categoría (click o drag).
- `src/components/Canvas.tsx`: vista central del árbol único de nodos.
- `src/components/BlockCard.tsx`: render recursivo de nodos, acciones mover/eliminar y zonas de drop hijas.
- `src/components/DropZone.tsx`: destinos de drop (entre hermanos, root y contenedores vacíos).
- `src/components/PropertiesPanel.tsx`: edición dinámica de `identifier`, `title` (`custom-container`) y props tipadas.
- `src/engine/jsonGenerator.ts`: generación genérica de salida VTEX desde el árbol.
- `src/components/ExportButton.tsx`: exportación y copiado al portapapeles.
- `src/App.tsx`: layout 3 paneles + `DndContext` (`@dnd-kit/core`) y reglas de drag end.

## Flujo funcional actual
1. Usuario define `landingName` (se slugifica en store).
2. Desde el panel izquierdo agrega componentes VTEX nativos (`rich-text`, `flex-layout.row`, etc.) por click o arrastre.
3. Si hay nodo seleccionado que acepta hijos, el alta por click se inserta dentro de ese nodo; si no, en raíz.
4. Reordena y reubica nodos con drag & drop usando `DropZone` (raíz y niveles anidados).
5. Edita `identifier` y props desde el panel derecho (según `propsSchema`).
6. Exporta: `generateLandingJSON` produce `store.custom#<landingName>` + nodos `type#identifier`, y se copia al portapapeles.

## Convenciones importantes
- IDs de nodo locales: `node-${Date.now()}-${counter}`.
- El árbol es único (`tree: TreeNode[]`), no hay separación Desktop/Mobile en estado.
- El export es genérico: no hay generadores por bloque; todo sale del tipo + props + children.
- Clave VTEX por nodo: `${node.type}#${node.identifier}`.
- Props internas (prefijo `__`) no se exportan dentro de `props`.
- `custom-container` puede exportar `title` tomando `props.__title`.
- `cleanProps` omite valores vacíos/default (`''`, `false`, `0`) para mantener salida limpia.

## Cómo agregar un componente VTEX nuevo
1. Agregar una entrada en `src/engine/vtexComponents.ts` con:
   - `type`, `label`, `icon`, `category`, `acceptsChildren`, `propsSchema`.
2. Definir `propsSchema` usando tipos soportados: `string | enum | boolean | number`.
3. Si `acceptsChildren` es `true`, el nodo podrá recibir drops hijos en canvas.
4. Verificar que aparece automáticamente en `BlockLibrary` (agrupado por `category`).
5. Confirmar que `PropertiesPanel` renderiza correctamente todos los campos del schema.
6. Probar exportación y revisar colisiones de `identifier` para evitar keys repetidas.

## Reglas para cambios seguros
- Mantener el árbol acíclico al mover nodos (no permitir mover un padre dentro de su descendencia).
- Si se agregan nuevos tipos de prop, extender `PropSchema` y `PropField` en `PropertiesPanel`.
- Evitar cambios en el shape base de salida JSON sin validar integración VTEX IO.
- Preservar la limpieza de salida (`cleanProps`) y el manejo de props internas (`__*`).
- Antes de cerrar cambios: correr `pnpm build`.

## Checklist rápido antes de entregar
- `pnpm build` exitoso.
- Sin errores TS/Vite.
- Flujo manual validado: agregar componente, drag & drop entre niveles, editar props, eliminar, exportar JSON/JSONC.
- `landingName` válido (slug) y sin caracteres no soportados.
