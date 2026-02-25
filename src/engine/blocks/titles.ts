import { BLOCK_TYPES } from '../../utils/constants'
import { BlockDefinition } from './types'

const titlesBlock: BlockDefinition = {
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
}

export default titlesBlock
