# ⚡ VTEX Landing Generator

**La forma más rápida y segura de construir Landing Pages para VTEX IO.**

🔴 **Live Demo:** [Prueba la aplicación web aquí](https://emanueleelias.github.io/vtex-landing-generator/)

Una herramienta visual diseñada para generar estructuras JSON compatibles con Store Framework sin tener que escribir código manualmente. Acelera tu go-to-market, estandariza tus componentes y elimina los errores de sintaxis en tus vistas.

![Node Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.x-blue)
![VTEX IO Compatible](https://img.shields.io/badge/VTEX%20IO-Store%20Framework-E3006F)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📑 Tabla de Contenidos
- [Demo en vivo](#-demo-en-vivo)
- [¿Qué es este proyecto?](#-qué-es-este-proyecto)
- [El problema que resuelve](#-problema-que-resuelve)
- [Por qué es vital para equipos VTEX](#-por-qué-es-vital-para-equipos-vtex-why-this-matters-for-vtex-teams)
- [Características principales](#-características-principales)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Ejemplo de salida](#-ejemplo-de-salida)
- [Integración con VTEX IO](#-integración-con-vtex-io)
- [Roadmap](#-roadmap)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

---

## 🔴 Demo en vivo

Puedes probar la aplicación funcionando y generar tus propios JSON sin necesidad de instalar nada localmente:
👉 **[Acceder al VTEX Landing Generator](https://emanueleelias.github.io/vtex-landing-generator/)**

---

## 🚀 ¿Qué es este proyecto?

**VTEX Landing Generator** es una aplicación web standalone que proporciona una interfaz gráfica para componer vistas de VTEX IO utilizando sus bloques nativos (`flex-layout`, `rich-text`, `image`, `slider-layout`, entre otros). 

En lugar de manipular extensos e intrincados archivos JSON a ciegas, los desarrolladores y equipos de contenido pueden configurar visualmente las propiedades de cada bloque y exportar instantáneamente el *schema* exacto listo para ser pegado en cualquier `store-theme`.

## 🧩 Problema que resuelve

Construir en VTEX IO presenta fricciones conocidas a la hora de maquetar:
- **Complejidad operativa:** Anidar bloques como `flex-layout.row` y `flex-layout.col` en JSON requiere una atención exhaustiva a la estructura, corchetes y comillas.
- **Tiempos de desarrollo excesivos:** Cualquier error de sintaxis en el JSON rompe la compilación (`vtex link`), obligando a invertir tiempo valioso en debuggear un archivo de configuración.
- **Repetición de código:** Los equipos suelen copiar y pegar bloques antiguos, perpetuando malas prácticas, clases CSS heredadas y estructuras poco optimizadas.
- **Cuello de botella técnico:** Los equipos de marketing y diseño dependen 100% de los desarrolladores para crear o modificar la estructura de una landing page.

## 💡 Por qué es vital para equipos VTEX (Why this matters for VTEX teams)

En agencias y operaciones de e-commerce a gran escala, el time-to-market es crítico. Esta herramienta actúa como un puente entre negocio y desarrollo:
- Para **Agencias**: Permite entregar landings en menor tiempo, incrementando el margen de rentabilidad de la célula de desarrollo.
- Para **Desarrolladores**: Elimina la tarea repetitiva de tipear JSONs interminables, permitiendo enfocarse por ejemplo en los estilos css.
- Para **E-commerce Managers**: Asegura que el código final cumple estrictamente con las convenciones de Store Framework, manteniendo la tienda rápida, escalable y libre de errores.

## ✨ Características principales

- **Composición Visual:** Agrega, anida y reordena bloques nativos (Rich Text, Sliders, Flex Layouts) con una interfaz intuitiva.
- **Generación Automática de JSON:** Conversión en tiempo real de tu configuración visual a la sintaxis exacta de `blocks.json`.
- **Preview Dinámico:** Visualiza el aspecto aproximado y la jerarquía de los componentes antes de llevarlos a tu workspace.
- **Validación de Props:** Configura alineaciones, tipografías, anchos y márgenes usando los valores oficiales soportados por VTEX.
- **Estructuras Responsive:** Define comportamientos diferentes para desktop y mobile directamente desde el generador.
- **Exportación en 1-click:** Copia el bloque final al portapapeles listo para pegarse en tu proyecto.

## 🏗️ Arquitectura

La aplicación está diseñada bajo el paradigma de renderizado en cliente para garantizar máxima velocidad y reactividad sin depender de servidores externos para procesar los layouts.

- **Stack Tecnológico:** React.js / TypeScript / Vite para el framework. Zustand para el manejo del estado global.
- **Sistema de Nodos (Tree Data Structure):** El layout se mantiene en el estado como un árbol de nodos. Cada nodo representa un bloque VTEX con sus respectivas propiedades y dependencias (`children`).
- **Parser de Salida:** Un motor de transformación lee el árbol del estado y genera un objeto JavaScript plano que replica la arquitectura requerida por VTEX, finalmente serializado a formato JSON.
- **Desacoplamiento:** Total separación entre la capa de renderizado visual (UI del dashboard) y el motor de generación de JSON.

## 📦 Instalación

Sigue estos pasos para arrancar el entorno de desarrollo en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-organizacion/vtex-landing-generator.git
   cd vtex-landing-generator
   ```

2. **Instalar dependencias:**
   Usando npm, yarn o pnpm (recomendado pnpm si es entorno monorepo/moderno):
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173` (o el puerto configurado).

## 🛠️ Uso

El flujo de trabajo estándar es altamente lineal y predictivo:

1. **Abre el Canvas:** Inicia un nuevo proyecto en blanco o comienza agregando un bloque contenedor (por ejemplo, `flex-layout.row#hero-section`).
2. **Añade Bloques y Anida:** Dentro de tu fila, inserta columnas (`flex-layout.col`). Añade textos (`rich-text`), imágenes (`image`) o carruseles (`slider-layout`).
3. **Configura Propiedades (Props):** Selecciona cualquier bloque en el canvas. En el panel lateral, ajusta atributos de Store Framework (ej. `blockClass`: "banner-principal", `textAlignment`: "CENTER", `textColor`: "c-on-emphasis").
4. **Generar Schema:** Haz clic en el botón de exportar. Obtendrás un fragmento de código JSON inmaculado.

## 📄 Ejemplo de salida

Si configuras visualmente una fila con un texto centrado y una imagen, la herramienta genera automáticamente un esquema como este, respetando la estructura oficial:

```json
{
  "store.custom#mi-landing": {
    "blocks": [
      // DESKTOP
  "responsive-layout.desktop#mi-landing",
      // MOBILE
  "responsive-layout.mobile#mi-landing"
    ]
  },
  "responsive-layout.desktop#mi-landing": {
    "children": [
      "flex-layout.row#mi-landing-desktop"
    ]
  },
  "flex-layout.row#mi-landing-desktop": {
    "children": [
      "flex-layout.col#mi-landing-desktop"
    ],
    "props": {
      "blockClass": "mi-landing-desktop",
      "fullWidth": true
    }
  },
  "flex-layout.col#mi-landing-desktop": {
    "children": [
      "custom-container#mi-landing-titles",
      "custom-container#mi-landing-two-img-text-2-desktop",
      "custom-container#mi-landing-two-img-3-desktop",
      "custom-container#mi-landing-img-text-4-desktop"
    ],
    "props": {
      "blockClass": "mi-landing-desktop"
    }
  },
  "responsive-layout.mobile#mi-landing": {
    "children": [
      "flex-layout.row#mi-landing-mobile"
    ]
  },
  "flex-layout.row#mi-landing-mobile": {
    "children": [
      "flex-layout.col#mi-landing-mobile"
    ],
    "props": {
      "blockClass": "mi-landing-mobile",
      "fullWidth": true
    }
  },
  "flex-layout.col#mi-landing-mobile": {
    "children": [
      "custom-container#mi-landing-titles",
      "custom-container#mi-landing-img-text-2-mobile",
      "custom-container#mi-landing-img-3-mobile",
      "custom-container#mi-landing-img-text-4-mobile"
    ],
    "props": {
      "blockClass": "mi-landing-mobile"
    }
  },
  "flex-layout.col#mi-landing-titles": {
    "children": [
      "rich-text#mi-landing-titles-title",
      "rich-text#mi-landing-titles-subtitle"
    ],
    "props": {
      "blockClass": "mi-landing-titles"
    }
  },
  "rich-text#mi-landing-titles-title": {
    "props": {
      "text": "TÍTULO",
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "blockClass": "mi-landing-title"
    }
  },
  "rich-text#mi-landing-titles-subtitle": {
    "props": {
      "text": "Lorem ipsum dolor sit amet",
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "blockClass": "mi-landing-subtitle"
    }
  },
  "custom-container#mi-landing-titles": {
    "children": [
      "flex-layout.col#mi-landing-titles"
    ],
    "title": "ON/OFF MI-LANDING-TITLES",
    "props": {
      "active": true
    }
  },
  "flex-layout.col#mi-landing-two-img-text-2-desktop": {
    "children": [
      "flex-layout.row#mi-landing-two-img-text-2-desktop-imgs",
      "rich-text#mi-landing-two-img-text-2-desktop-text"
    ],
    "props": {
      "blockClass": "mi-landing-two-imgs-text"
    }
  },
  "flex-layout.row#mi-landing-two-img-text-2-desktop-imgs": {
    "children": [
      "image#mi-landing-two-img-text-2-desktop-img-1",
      "image#mi-landing-two-img-text-2-desktop-img-2"
    ]
  },
  "image#mi-landing-two-img-text-2-desktop-img-1": {
    "props": {
      "src": "https://dummyimage.com/1000x1250/acacac/2c2c2c.png&text=",
      "blockClass": "mi-landing-two-imgs-text-img"
    }
  },
  "image#mi-landing-two-img-text-2-desktop-img-2": {
    "props": {
      "src": "https://dummyimage.com/1000x1250/bcbcbc/2c2c2c.png&text=",
      "blockClass": "mi-landing-two-imgs-text-img"
    }
  },
  "rich-text#mi-landing-two-img-text-2-desktop-text": {
    "props": {
      "text": "**Shop this look** / [Producto 1 – $00.00](/producto-1/p) / [Producto 2 – $00.00](/producto-2/p)",
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "blockClass": "mi-landing-two-img-text-text"
    }
  },
  "custom-container#mi-landing-two-img-text-2-desktop": {
    "children": [
      "flex-layout.col#mi-landing-two-img-text-2-desktop"
    ],
    "title": "ON/OFF MI-LANDING-TWO-IMG-TEXT-2-DESKTOP",
    "props": {
      "active": true
    }
  },
  "flex-layout.row#mi-landing-two-img-3-desktop": {
    "children": [
      "image#mi-landing-two-img-3-desktop-img-1",
      "image#mi-landing-two-img-3-desktop-img-2"
    ],
    "props": {
      "blockClass": "mi-landing-two-image"
    }
  },
  "image#mi-landing-two-img-3-desktop-img-1": {
    "props": {
      "src": "https://dummyimage.com/1000x1250/acacac/2c2c2c.png&text=",
      "blockClass": "mi-landing-two-img-img"
    }
  },
  "image#mi-landing-two-img-3-desktop-img-2": {
    "props": {
      "src": "https://dummyimage.com/1000x1250/bcbcbc/2c2c2c.png&text=",
      "blockClass": "mi-landing-two-img-img"
    }
  },
  "custom-container#mi-landing-two-img-3-desktop": {
    "children": [
      "flex-layout.row#mi-landing-two-img-3-desktop"
    ],
    "title": "ON/OFF MI-LANDING-TWO-IMG-3-DESKTOP",
    "props": {
      "active": true
    }
  },
  "flex-layout.col#mi-landing-img-text-4-desktop": {
    "children": [
      "image#mi-landing-img-text-4-desktop-img",
      "rich-text#mi-landing-img-text-4-desktop-text"
    ],
    "props": {
      "blockClass": "mi-landing-img-text"
    }
  },
  "image#mi-landing-img-text-4-desktop-img": {
    "props": {
      "src": "https://dummyimage.com/1000x1250/acacac/2c2c2c.png&text=",
      "blockClass": "mi-landing-img-text-img"
    }
  },
  "rich-text#mi-landing-img-text-4-desktop-text": {
    "props": {
      "text": "**Shop this look** / [Producto – $00.00](/producto/p)",
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "blockClass": "mi-landing-img-text-text"
    }
  },
  "custom-container#mi-landing-img-text-4-desktop": {
    "children": [
      "flex-layout.col#mi-landing-img-text-4-desktop"
    ],
    "title": "ON/OFF MI-LANDING-IMG-TEXT-4-DESKTOP",
    "props": {
      "active": true
    }
  },
  "flex-layout.col#mi-landing-img-text-2-mobile": {
    "children": [
      "image#mi-landing-img-text-2-mobile-img",
      "rich-text#mi-landing-img-text-2-mobile-text"
    ],
    "props": {
      "blockClass": "mi-landing-two-imgs-text-mobile"
    }
  },
  "image#mi-landing-img-text-2-mobile-img": {
    "props": {
      "src": "https://dummyimage.com/420x525/acacac/2c2c2c.png&text=",
      "blockClass": "mi-landing-two-imgs-text-img-mobile"
    }
  },
  "rich-text#mi-landing-img-text-2-mobile-text": {
    "props": {
      "text": "**Shop this look** / [Producto 1 – $00.00](/producto-1/p) / [Producto 2 – $00.00](/producto-2/p)",
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "blockClass": "mi-landing-img-text-text-mobile"
    }
  },
  "custom-container#mi-landing-img-text-2-mobile": {
    "children": [
      "flex-layout.col#mi-landing-img-text-2-mobile"
    ],
    "title": "ON/OFF MI-LANDING-IMG-TEXT-2-MOBILE",
    "props": {
      "active": true
    }
  },
  "flex-layout.row#mi-landing-img-3-mobile": {
    "children": [
      "image#mi-landing-img-3-mobile-img-1",
      "image#mi-landing-img-3-mobile-img-2"
    ],
    "props": {
      "blockClass": "mi-landing-image-mobile"
    }
  },
  "image#mi-landing-img-3-mobile-img-1": {
    "props": {
      "src": "https://dummyimage.com/420x525/acacac/2c2c2c.png&text=",
      "blockClass": "mi-landing-img-mobile"
    }
  },
  "image#mi-landing-img-3-mobile-img-2": {
    "props": {
      "src": "https://dummyimage.com/420x525/bcbcbc/3c3c3c.png&text=",
      "blockClass": "mi-landing-img-mobile"
    }
  },
  "custom-container#mi-landing-img-3-mobile": {
    "children": [
      "flex-layout.row#mi-landing-img-3-mobile"
    ],
    "title": "ON/OFF MI-LANDING-IMG-3-MOBILE",
    "props": {
      "active": true
    }
  },
  "flex-layout.col#mi-landing-img-text-4-mobile": {
    "children": [
      "image#mi-landing-img-text-4-mobile-img",
      "rich-text#mi-landing-img-text-4-mobile-text"
    ],
    "props": {
      "blockClass": "mi-landing-img-text-mobile"
    }
  },
  "image#mi-landing-img-text-4-mobile-img": {
    "props": {
      "src": "https://dummyimage.com/420x525/acacac/2c2c2c.png&text=",
      "blockClass": "mi-landing-img-text-img-mobile"
    }
  },
  "rich-text#mi-landing-img-text-4-mobile-text": {
    "props": {
      "text": "**Shop this look** / [Producto – $00.00](/producto/p)",
      "textAlignment": "CENTER",
      "textPosition": "CENTER",
      "blockClass": "mi-landing-img-text-text-mobile"
    }
  },
  "custom-container#mi-landing-img-text-4-mobile": {
    "children": [
      "flex-layout.col#mi-landing-img-text-4-mobile"
    ],
    "title": "ON/OFF MI-LANDING-IMG-TEXT-4-MOBILE",
    "props": {
      "active": true
    }
  }
}
```

## 🔌 Integración con VTEX IO

El output generado por la herramienta está diseñado para integrarse nativamente en tu tienda sin transformaciones intermedias.

1. Navega a la carpeta `store/blocks/` (o donde residan tus templates) en tu proyecto de tema (`store-theme`).
2. Crea o edita un archivo JSON/JSONC para tu landing, por ejemplo `store/blocks/landings/cyber-monday.jsonc`.
3. Pega el JSON generado.
4. Vincula el nombre de tu "store.custom#--" con una ruta en el archivo routes.json que se encuetra en /store/routes.json dentro de tu proyecto de vtex.
5. Ejecuta `vtex link` y prueba el resultado final en vivo.
6. Ya tiene el esqueleto de tu landing listo solo tienes que empezar a darle estilos.

## 🧪 Roadmap

- Soporte nativo y pre-configurado para `list-context` y `shelf` para estantes de productos.
- Importación inversa: Pegar un JSON existente y que el canvas lo interprete gráficamente para poder editarlo.
- Plantillas prediseñadas base (Hero banners, Features list, Contact forms).
- Historial local de modificaciones (Deshacer/Rehacer).
- Sistema de Breakpoints para cambiar previsualizaciones entre Desktop, Tablet y Mobile.

## 🤝 Contribuciones

Las Pull Requests son bienvenidas. Para cambios arquitectónicos o de gran impacto, por favor abre un _Issue_ primero para discutir la aproximación técnica.

1. Haz un fork del repositorio.
2. Crea tu rama feature (`git checkout -b feature/NuevaVtexFeature`).
3. Comitea tus cambios y explica el concepto (`git commit -m 'feat: agrega soporte para rich-text markdown'`).
4. Sube a tu rama (`git push origin feature/NuevaVtexFeature`).
5. Abre y describe tu Pull Request.

## 📜 Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener toda la información y permisos legales.
