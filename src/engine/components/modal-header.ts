import type { VtexComponentDefinition } from '../types'

export const modalHeader: VtexComponentDefinition = {
    type: 'modal-header',
    label: 'Modal Header',
    icon: 'Heading',
    category: 'layout',
    acceptsChildren: true,
    hidden: true,
    childrenTemplate: [
        { type: 'rich-text', props: { text: 'Title' } },
    ],
    propsSchema: [
        {
            name: 'showCloseButton',
            type: 'boolean',
            label: 'Show Close Button',
            default: true,
        },
        {
            name: 'iconCloseSize',
            type: 'number',
            label: 'Close Icon Size',
            default: 32,
        },
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: '',
        },
    ],
}
