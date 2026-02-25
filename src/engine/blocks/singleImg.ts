import { BLOCK_TYPES, PLACEHOLDER_IMAGES } from '../../utils/constants'
import { BlockDefinition } from './types'

const singleImgBlock: BlockDefinition = {
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
}

export default singleImgBlock
