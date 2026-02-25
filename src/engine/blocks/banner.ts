import { BLOCK_TYPES, PLACEHOLDER_IMAGES } from '../../utils/constants'
import { BlockDefinition } from './types'

const bannerBlock: BlockDefinition = {
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
}

export default bannerBlock
