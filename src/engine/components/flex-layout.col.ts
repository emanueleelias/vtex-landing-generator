import type { VtexComponentDefinition } from '../types'

export const flexLayoutCol: VtexComponentDefinition = {
    type: 'flex-layout.col',
    label: 'Flex Layout Col',
    icon: 'Columns3',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
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
        {
            name: 'verticalAlign',
            type: 'enum',
            label: 'Alineación vertical',
            default: 'top',
            options: [
                { value: 'top', label: 'Top' },
                { value: 'middle', label: 'Middle' },
                { value: 'bottom', label: 'Bottom' },
            ],
        },
        { name: 'preventVerticalStretch', type: 'boolean', label: 'Prevent Vertical Stretch', default: false },
        { name: 'rowGap', type: 'number', label: 'Row Gap', default: 0 },
        { name: 'paddingTop', type: 'number', label: 'Padding Top (0-10)', default: 0 },
        { name: 'paddingBottom', type: 'number', label: 'Padding Bottom (0-10)', default: 0 },
    ],
}
