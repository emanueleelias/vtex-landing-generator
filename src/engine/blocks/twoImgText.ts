import { BLOCK_TYPES, PLACEHOLDER_IMAGES } from '../../utils/constants'
import { BlockDefinition } from './types'

const twoImgTextBlock: BlockDefinition = {
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
}

export default twoImgTextBlock
