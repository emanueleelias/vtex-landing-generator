import type { VtexComponentDefinition } from '../types'

export const modalActionsClose: VtexComponentDefinition = {
    type: 'modal-actions.close',
    label: 'Modal Close Button',
    icon: 'XSquare',
    category: 'content',
    acceptsChildren: false,
    hidden: true,
    propsSchema: [
        {
            name: 'label',
            type: 'string',
            label: 'Button Label',
            default: 'Cancelar',
        },
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: '',
        },
    ],
}
