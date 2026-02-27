import type { VtexComponentDefinition } from '../types'

export const modalContent: VtexComponentDefinition = {
    type: 'modal-content',
    label: 'Modal Content',
    icon: 'AlignLeft',
    category: 'layout',
    acceptsChildren: true,
    hidden: true,
    childrenTemplate: [
        { type: 'rich-text', props: { text: 'Hello' } },
    ],
    propsSchema: [
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: '',
        },
    ],
}
