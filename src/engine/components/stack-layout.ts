import type { VtexComponentDefinition } from '../types'

export const stackLayout: VtexComponentDefinition = {
    type: 'stack-layout',
    label: 'Stack Layout',
    icon: 'SquareStack',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        { name: 'zIndexOffset', type: 'number', label: 'Z-Index Offset', default: 0 },
        { name: 'arialabel', type: 'string', label: 'Aria Label', default: '' },
    ],
}
