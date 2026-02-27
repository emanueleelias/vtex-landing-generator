import type { VtexComponentDefinition } from '../types'

export const modalActions: VtexComponentDefinition = {
    type: 'modal-actions',
    label: 'Modal Actions',
    icon: 'PanelBottom',
    category: 'layout',
    acceptsChildren: true,
    hidden: true,
    childrenTemplate: [
        { type: 'modal-actions.close' },
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
