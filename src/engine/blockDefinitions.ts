import { BLOCK_TYPES, PLACEHOLDER_IMAGES } from '../utils/constants'
import { BlockProps } from '../store/landingStore'

export interface BlockDefinition {
  type: string
  label: string
  description: string
  icon: 'Type' | 'Columns' | 'Image' | 'FileImage' | 'ImageIcon' | 'PanelTop'
  defaultProps: BlockProps
  shared: boolean
  generateNodes?: (id: string, landingName: string, props: BlockProps, index: number) => { rootKey: string; nodes: any }
  generateDesktopNodes?: (id: string, landingName: string, props: BlockProps, index: number) => { rootKey: string; nodes: any }
  generateMobileNodes?: (id: string, landingName: string, props: BlockProps, index: number) => { rootKey: string; nodes: any }
}

const blockDefinitions: BlockDefinition[] = [
  {
    type: BLOCK_TYPES.TITLES,
    label: 'Títulos',
    description: 'Título principal + subtítulo',
    icon: 'Type',
    defaultProps: {
      title: 'TÍTULO',
      subtitle: 'Lorem ipsum dolor sit amet',
    },
    // Los títulos generalmente se comparten entre desktop y mobile
    shared: true,
    generateNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-titles${index > 0 ? `-${index}` : ''}`
      const nodes: any = {}

      nodes[`flex-layout.col#${suffix}`] = {
        children: [
          `rich-text#${suffix}-title`,
          `rich-text#${suffix}-subtitle`,
        ],
        props: {
          blockClass: `${landingName}-titles`,
        },
      }

      nodes[`rich-text#${suffix}-title`] = {
        props: {
          text: props.title,
          textAlignment: 'CENTER',
          textPosition: 'CENTER',
          blockClass: `${landingName}-title`,
        },
      }

      nodes[`rich-text#${suffix}-subtitle`] = {
        props: {
          text: props.subtitle,
          textAlignment: 'CENTER',
          textPosition: 'CENTER',
          blockClass: `${landingName}-subtitle`,
        },
      }

      return {
        rootKey: `flex-layout.col#${suffix}`,
        nodes,
      }
    },
  },

  {
    type: BLOCK_TYPES.TWO_IMG_TEXT,
    label: 'Dos Imágenes + Texto',
    description: '2 imágenes lado a lado con texto debajo',
    icon: 'Columns',
    defaultProps: {
      img1: '',
      img2: '',
      text: '**Shop this look** / [Producto 1 – $00.00](/producto-1/p) / [Producto 2 – $00.00](/producto-2/p)',
    },
    shared: false,
    generateDesktopNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-two-img-text-${index + 1}-desktop`
      const nodes: any = {}

      nodes[`flex-layout.col#${suffix}`] = {
        children: [
          `flex-layout.row#${suffix}-imgs`,
          `rich-text#${suffix}-text`,
        ],
        props: {
          blockClass: `${landingName}-two-imgs-text`,
        },
      }

      nodes[`flex-layout.row#${suffix}-imgs`] = {
        children: [
          `image#${suffix}-img-1`,
          `image#${suffix}-img-2`,
        ],
      }

      nodes[`image#${suffix}-img-1`] = {
        props: {
          src: props.img1 || PLACEHOLDER_IMAGES.desktop.main,
          blockClass: `${landingName}-two-imgs-text-img`,
        },
      }

      nodes[`image#${suffix}-img-2`] = {
        props: {
          src: props.img2 || PLACEHOLDER_IMAGES.desktop.alt,
          blockClass: `${landingName}-two-imgs-text-img`,
        },
      }

      nodes[`rich-text#${suffix}-text`] = {
        props: {
          text: props.text,
          textAlignment: 'CENTER',
          textPosition: 'CENTER',
          blockClass: `${landingName}-two-img-text-text`,
        },
      }

      return {
        rootKey: `flex-layout.col#${suffix}`,
        nodes,
      }
    },
    generateMobileNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-img-text-${index + 1}-mobile`
      const nodes: any = {}

      nodes[`flex-layout.col#${suffix}`] = {
        children: [
          `image#${suffix}-img`,
          `rich-text#${suffix}-text`,
        ],
        props: {
          blockClass: `${landingName}-two-imgs-text-mobile`,
        },
      }

      nodes[`image#${suffix}-img`] = {
        props: {
          src: props.img1 || PLACEHOLDER_IMAGES.mobile.main,
          blockClass: `${landingName}-two-imgs-text-img-mobile`,
        },
      }

      nodes[`rich-text#${suffix}-text`] = {
        props: {
          text: props.text,
          textAlignment: 'CENTER',
          textPosition: 'CENTER',
          blockClass: `${landingName}-img-text-text-mobile`,
        },
      }

      return {
        rootKey: `flex-layout.col#${suffix}`,
        nodes,
      }
    },
  },

  {
    type: BLOCK_TYPES.TWO_IMG,
    label: 'Dos Imágenes',
    description: '2 imágenes lado a lado',
    icon: 'Image',
    defaultProps: {
      img1: '',
      img2: '',
    },
    shared: false,
    generateDesktopNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-two-img-${index + 1}-desktop`
      const nodes: any = {}

      nodes[`flex-layout.row#${suffix}`] = {
        children: [
          `image#${suffix}-img-1`,
          `image#${suffix}-img-2`,
        ],
        props: {
          blockClass: `${landingName}-two-image`,
        },
      }

      nodes[`image#${suffix}-img-1`] = {
        props: {
          src: props.img1 || PLACEHOLDER_IMAGES.desktop.main,
          blockClass: `${landingName}-two-img-img`,
        },
      }

      nodes[`image#${suffix}-img-2`] = {
        props: {
          src: props.img2 || PLACEHOLDER_IMAGES.desktop.alt,
          blockClass: `${landingName}-two-img-img`,
        },
      }

      return {
        rootKey: `flex-layout.row#${suffix}`,
        nodes,
      }
    },
    generateMobileNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-img-${index + 1}-mobile`
      const nodes: any = {}

      nodes[`flex-layout.row#${suffix}`] = {
        children: [
          `image#${suffix}-img-1`,
          `image#${suffix}-img-2`,
        ],
        props: {
          blockClass: `${landingName}-image-mobile`,
        },
      }

      nodes[`image#${suffix}-img-1`] = {
        props: {
          src: props.img1 || PLACEHOLDER_IMAGES.mobile.main,
          blockClass: `${landingName}-img-mobile`,
        },
      }

      nodes[`image#${suffix}-img-2`] = {
        props: {
          src: props.img2 || PLACEHOLDER_IMAGES.mobile.alt,
          blockClass: `${landingName}-img-mobile`,
        },
      }

      return {
        rootKey: `flex-layout.row#${suffix}`,
        nodes,
      }
    },
  },

  {
    type: BLOCK_TYPES.IMG_TEXT,
    label: 'Imagen + Texto',
    description: 'Una imagen con texto debajo',
    icon: 'FileImage',
    defaultProps: {
      img1: '',
      text: '**Shop this look** / [Producto – $00.00](/producto/p)',
    },
    shared: false,
    generateDesktopNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-img-text-${index + 1}-desktop`
      const nodes: any = {}

      nodes[`flex-layout.col#${suffix}`] = {
        children: [
          `image#${suffix}-img`,
          `rich-text#${suffix}-text`,
        ],
        props: {
          blockClass: `${landingName}-img-text`,
        },
      }

      nodes[`image#${suffix}-img`] = {
        props: {
          src: props.img1 || PLACEHOLDER_IMAGES.desktop.main,
          blockClass: `${landingName}-img-text-img`,
        },
      }

      nodes[`rich-text#${suffix}-text`] = {
        props: {
          text: props.text,
          textAlignment: 'CENTER',
          textPosition: 'CENTER',
          blockClass: `${landingName}-img-text-text`,
        },
      }

      return {
        rootKey: `flex-layout.col#${suffix}`,
        nodes,
      }
    },
    generateMobileNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-img-text-${index + 1}-mobile`
      const nodes: any = {}

      nodes[`flex-layout.col#${suffix}`] = {
        children: [
          `image#${suffix}-img`,
          `rich-text#${suffix}-text`,
        ],
        props: {
          blockClass: `${landingName}-img-text-mobile`,
        },
      }

      nodes[`image#${suffix}-img`] = {
        props: {
          src: props.img1 || PLACEHOLDER_IMAGES.mobile.main,
          blockClass: `${landingName}-img-text-img-mobile`,
        },
      }

      nodes[`rich-text#${suffix}-text`] = {
        props: {
          text: props.text,
          textAlignment: 'CENTER',
          textPosition: 'CENTER',
          blockClass: `${landingName}-img-text-text-mobile`,
        },
      }

      return {
        rootKey: `flex-layout.col#${suffix}`,
        nodes,
      }
    },
  },

  {
    type: BLOCK_TYPES.SINGLE_IMG,
    label: 'Imagen Sola',
    description: 'Una imagen de ancho completo',
    icon: 'ImageIcon',
    defaultProps: {
      img1: '',
    },
    shared: false,
    generateDesktopNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-single-img-${index + 1}-desktop`
      const nodes: any = {}

      nodes[`image#${suffix}`] = {
        props: {
          src: props.img1 || PLACEHOLDER_IMAGES.desktop.main,
          blockClass: `${landingName}-single-img`,
        },
      }

      return {
        rootKey: `image#${suffix}`,
        nodes,
      }
    },
    generateMobileNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-single-img-${index + 1}-mobile`
      const nodes: any = {}

      nodes[`image#${suffix}`] = {
        props: {
          src: props.img1 || PLACEHOLDER_IMAGES.mobile.main,
          blockClass: `${landingName}-single-img-mobile`,
        },
      }

      return {
        rootKey: `image#${suffix}`,
        nodes,
      }
    },
  },

  {
    type: BLOCK_TYPES.BANNER,
    label: 'Banner Full Width',
    description: 'Imagen banner de ancho completo',
    icon: 'PanelTop',
    defaultProps: {
      img1: '',
      link: '',
    },
    shared: false,
    generateDesktopNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-banner-${index + 1}-desktop`
      const nodes: any = {}

      const imgProps: any = {
        src: props.img1 || PLACEHOLDER_IMAGES.desktop.banner,
        blockClass: `${landingName}-banner`,
      }

      if (props.link) {
        imgProps.link = { url: props.link }
      }

      nodes[`image#${suffix}`] = { props: imgProps }

      return {
        rootKey: `image#${suffix}`,
        nodes,
      }
    },
    generateMobileNodes: (_id, landingName, props, index) => {
      const suffix = `${landingName}-banner-${index + 1}-mobile`
      const nodes: any = {}

      const imgProps: any = {
        src: props.img1 || PLACEHOLDER_IMAGES.mobile.banner,
        blockClass: `${landingName}-banner-mobile`,
      }

      if (props.link) {
        imgProps.link = { url: props.link }
      }

      nodes[`image#${suffix}`] = { props: imgProps }

      return {
        rootKey: `image#${suffix}`,
        nodes,
      }
    },
  },
]

export default blockDefinitions

/**
 * Obtener definición de bloque por tipo
 */
export function getBlockDefinition(type: string): BlockDefinition | undefined {
  return blockDefinitions.find((b) => b.type === type)
}
