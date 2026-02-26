import type { VtexComponentDefinition } from '../types'

export const stickyLayout: VtexComponentDefinition = {
    type: 'sticky-layout',
    label: 'Sticky Layout',
    icon: 'Pin',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        {
            name: 'position',
            type: 'enum',
            label: 'Position',
            default: 'top',
            options: [
                { value: 'top', label: 'Top' },
                { value: 'bottom', label: 'Bottom' },
            ],
        },
        { name: 'verticalSpacing', type: 'number', label: 'Vertical Spacing (px)', default: 0 },
    ],
}
