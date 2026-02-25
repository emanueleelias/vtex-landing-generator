import { BLOCK_TYPES, PLACEHOLDER_IMAGES } from '../../utils/constants'
import { BlockDefinition } from './types'

const imgTextBlock: BlockDefinition = {
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
}

export default imgTextBlock
