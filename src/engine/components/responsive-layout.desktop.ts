import type { VtexComponentDefinition } from '../types'

export const responsiveLayoutDesktop: VtexComponentDefinition = {
    type: 'responsive-layout.desktop',
    label: 'Responsive Desktop',
    icon: 'Monitor',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
    ],
}
