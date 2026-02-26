import type { VtexComponentDefinition } from '../types'

export const customContainer: VtexComponentDefinition = {
    type: 'custom-container',
    label: 'Custom Container',
    icon: 'Box',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'active', type: 'boolean', label: 'Activo', default: true },
    ],
}
