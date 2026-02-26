import type { VtexComponentDefinition } from '../types'

export const blockReference: VtexComponentDefinition = {
    type: '__block-reference',
    label: 'Ref. a Bloque',
    icon: 'Link2',
    category: 'utility',
    acceptsChildren: false,
    propsSchema: [
        { name: '__targetKey', type: 'string', label: 'Bloque destino', default: '' },
    ],
}
