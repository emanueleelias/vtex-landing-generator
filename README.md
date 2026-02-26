# VTEX IO Landing Generator

Generador visual para construir estructuras de bloques VTEX IO y exportarlas como JSON listo para `store-theme`.

Demo: https://emanueleelias.github.io/vtex-landing-generator/

## Que hace hoy

- Biblioteca de componentes VTEX IO nativos en panel izquierdo.
- Canvas central con estructura de arbol unica.
- Drag and drop para insertar y reordenar nodos (raiz y niveles anidados).
- Panel de propiedades dinamico segun `propsSchema`.
- Exportacion en un click al portapapeles.

## Componentes soportados

Layout:
- `flex-layout.row`
- `flex-layout.col`
- `responsive-layout.desktop`
- `responsive-layout.mobile`
- `custom-container`

Contenido:
- `rich-text`

Media:
- `image`

## Flujo de uso

1. Defini el nombre de la landing (`landingName`).
2. Agrega componentes desde el panel izquierdo (click o arrastre).
3. Reordena y anida en el canvas usando drag and drop.
4. Edita `identifier` y props en el panel derecho.
5. Copia el JSON generado con `Copiar JSONC`.

## Ejemplo de salida

```json
{
  "store.custom#mi-landing": {
    "blocks": [
      "flex-layout.row#hero-row"
    ]
  },
  "flex-layout.row#hero-row": {
    "children": [
      "flex-layout.col#hero-col"
    ],
    "props": {
      "blockClass": "hero-row",
      "fullWidth": true
    }
  },
  "flex-layout.col#hero-col": {
    "children": [
      "rich-text#hero-title",
      "image#hero-image"
    ],
    "props": {
      "blockClass": "hero-col"
    }
  },
  "rich-text#hero-title": {
    "props": {
      "text": "## Nueva coleccion",
      "textAlignment": "CENTER",
      "textPosition": "CENTER"
    }
  },
  "image#hero-image": {
    "props": {
      "src": "https://example.com/banner.jpg",
      "alt": "Banner principal",
      "maxWidth": "100%"
    }
  }
}
```

## Integracion con VTEX IO

1. Copia el JSON desde la app.
2. Pegalo en tu archivo de bloques, por ejemplo:
   - `store/blocks/landings/mi-landing.jsonc`
3. Crea o ajusta la ruta en `store/routes.json` para apuntar a `store.custom#mi-landing`.
4. Ejecuta `vtex link` y valida la landing en tu workspace.

## Instalacion local

Requisitos:
- Node.js 18+
- npm o pnpm

Comandos:

```bash
npm install
npm run dev
```

Con pnpm:

```bash
pnpm install
pnpm dev
```

Scripts disponibles:
- `dev`
- `build`
- `preview`

## Arquitectura (resumen)

- `src/engine/vtexComponents.ts`: catalogo de componentes y schemas.
- `src/store/landingStore.ts`: estado global del arbol y acciones CRUD/DnD.
- `src/components/BlockLibrary.tsx`: biblioteca de componentes.
- `src/components/Canvas.tsx`: render del arbol.
- `src/components/DropZone.tsx`: destinos de drop.
- `src/components/PropertiesPanel.tsx`: editor dinamico de props.
- `src/engine/jsonGenerator.ts`: generacion del JSON final.

## Agregar un componente nuevo

1. Registra el componente en `src/engine/vtexComponents.ts`.
2. Define `propsSchema` y `acceptsChildren`.
3. Verifica aparicion en biblioteca.
4. Prueba edicion de props y exportacion.

## Limitaciones actuales

- No hay importador de JSON a canvas.
- No hay undo/redo.
- No hay tests automaticos.

## Contribuir

1. Crea una rama:
   - `git checkout -b feature/nombre-cambio`
2. Aplica cambios y commit.
3. Abre un Pull Request con descripcion tecnica clara.

## Licencia

MIT.
