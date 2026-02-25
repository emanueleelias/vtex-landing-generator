# AGENT.md

Guía para agentes que trabajen en `vtex-landing-generator`.

## Resumen
- Proyecto: generador visual de landings VTEX IO en formato JSONC.
- Stack: React 18 + TypeScript + Vite + Tailwind CSS + Zustand.
- Objetivo funcional: componer bloques para Desktop/Mobile y copiar al portapapeles la configuración VTEX.

## Comandos de trabajo
- Instalar dependencias: `pnpm install`
- Desarrollo local: `pnpm dev`
- Build producción: `pnpm build`
- Preview build: `pnpm preview`

Nota: no hay tests automáticos configurados actualmente.

## Estructura clave
- `src/store/landingStore.ts`: estado global (nombre landing, bloques desktop/mobile, selección y acciones CRUD).
- `src/engine/blockDefinitions.ts`: catálogo de bloques y lógica de generación por tipo.
- `src/engine/jsonGenerator.ts`: ensamblado final de nodos VTEX (`store.custom`, `responsive-layout`, `flex-layout`, `custom-container`).
- `src/components/BlockLibrary.tsx`: alta de bloques desde catálogo.
- `src/components/Canvas.tsx`: tabs Desktop/Mobile y listado de bloques por vista.
- `src/components/BlockCard.tsx`: selección, orden, duplicado y borrado.
- `src/components/PropertiesPanel.tsx`: edición dinámica de props y `custom-container`.
- `src/components/ExportButton.tsx`: generación JSONC + copiado a clipboard.
- `src/utils/constants.ts`: tipos de bloque y placeholders.

## Flujo funcional actual
1. Usuario define `landingName` (se slugifica en store).
2. Agrega bloques por tab (desktop o mobile).
3. Edita props del bloque seleccionado.
4. Exporta: `generateLandingJSON` crea nodos VTEX y `serializeToJSONC` agrega comentarios de sección.
5. Resultado se copia al portapapeles.

## Convenciones importantes
- IDs de bloque locales: `block-${Date.now()}-${counter}`.
- Bloques `shared` (como `titles`) pueden reutilizar lógica única (`generateNodes`) para ambos layouts.
- Bloques no compartidos requieren `generateDesktopNodes` y `generateMobileNodes`.
- `useContainer` habilita wrapping automático en `custom-container#...`.
- Si una prop de imagen está vacía, se usa placeholder de `PLACEHOLDER_IMAGES`.

## Cómo agregar un bloque nuevo
1. Definir tipo en `src/utils/constants.ts` dentro de `BLOCK_TYPES`.
2. Crear definición en `src/engine/blockDefinitions.ts` con:
   - `type`, `label`, `description`, `icon`, `defaultProps`, `shared`.
   - `generateNodes` (si compartido) o `generateDesktopNodes` + `generateMobileNodes`.
3. Asegurar que `defaultProps` use claves soportadas por `BlockProps` (`title`, `subtitle`, `text`, `img1`, `img2`, `link`) o extender el tipo si hace falta.
4. Verificar que el bloque aparece en `BlockLibrary` (usa `blockDefinitions` automáticamente).
5. Confirmar que `PropertiesPanel` renderiza campos esperados según props.
6. Probar exportación y revisar naming de keys VTEX para evitar colisiones.

## Reglas para cambios seguros
- Mantener consistencia entre `desktopBlocks` y `mobileBlocks` en acciones del store.
- Si se tocan props nuevas, actualizar `BlockProps` y el render dinámico en `PropertiesPanel`.
- Evitar cambios en el shape base de salida JSON sin validar integración VTEX.
- Antes de cerrar cambios: correr `pnpm build`.

## Checklist rápido antes de entregar
- `pnpm build` exitoso.
- Sin errores TS/Vite.
- Flujo manual validado: agregar bloque, editar props, mover/duplicar/eliminar, exportar JSONC.
- `landingName` válido (slug) y sin caracteres no soportados.
