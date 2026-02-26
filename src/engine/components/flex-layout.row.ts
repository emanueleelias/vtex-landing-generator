import type { VtexComponentDefinition } from '../types'

export const flexLayoutRow: VtexComponentDefinition = {
    type: 'flex-layout.row',
    label: 'Flex Layout Row',
    icon: 'Rows3',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        { name: 'fullWidth', type: 'boolean', label: 'Full Width', default: false },
        {
            name: 'horizontalAlign',
            type: 'enum',
            label: 'Alineación horizontal',
            default: 'left',
            options: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
            ],
        },
        { name: 'preventHorizontalStretch', type: 'boolean', label: 'Prevent Horizontal Stretch', default: false },
        { name: 'preventVerticalStretch', type: 'boolean', label: 'Prevent Vertical Stretch', default: false },
        { name: 'colGap', type: 'number', label: 'Column Gap', default: 0 },
        { name: 'paddingTop', type: 'number', label: 'Padding Top (0-10)', default: 0 },
        { name: 'paddingBottom', type: 'number', label: 'Padding Bottom (0-10)', default: 0 },
    ],
}
