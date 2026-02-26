import type { VtexComponentDefinition } from '../types'

export const responsiveLayoutMobile: VtexComponentDefinition = {
    type: 'responsive-layout.mobile',
    label: 'Responsive Mobile',
    icon: 'Smartphone',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
    ],
}
