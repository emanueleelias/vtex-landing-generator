import { BLOCK_TYPES, PLACEHOLDER_IMAGES } from '../../utils/constants'
import { BlockDefinition } from './types'

const twoImgBlock: BlockDefinition = {
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
}

export default twoImgBlock
