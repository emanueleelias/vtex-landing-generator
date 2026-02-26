import type { VtexComponentDefinition } from '../types'

export const flexLayoutCol: VtexComponentDefinition = {
    type: 'flex-layout.col',
    label: 'Flex Layout Col',
    icon: 'Columns3',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        { name: 'borderColor', type: 'string', label: 'Border Color', default: '' },
        { name: 'borderWidth', type: 'number', label: 'Border Width (0-5)', default: 0 },
        { name: 'border', type: 'string', label: 'Border (top, right, bottom, left, all)', default: '' },
        {
            name: 'horizontalAlign',
            type: 'enum',
            label: 'Horizontal Align',
            default: 'left',
            options: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
            ],
        },
        { name: 'marginLeft', type: 'number', label: 'Margin Left (0-10)', default: 0 },
        { name: 'marginRight', type: 'number', label: 'Margin Right (0-10)', default: 0 },
        { name: 'paddingLeft', type: 'number', label: 'Padding Left (0-10)', default: 0 },
        { name: 'paddingRight', type: 'number', label: 'Padding Right (0-10)', default: 0 },
        { name: 'preventVerticalStretch', type: 'boolean', label: 'Prevent Vertical Stretch', default: false },
        { name: 'rowGap', type: 'number', label: 'Row Gap (0-10)', default: 0 },
        {
            name: 'verticalAlign',
            type: 'enum',
            label: 'Vertical Align',
            default: 'top',
            options: [
                { value: 'top', label: 'Top' },
                { value: 'middle', label: 'Middle' },
                { value: 'bottom', label: 'Bottom' },
            ],
        },
        { name: 'width', type: 'string', label: 'Width (e.g. 50%, grow, 100%)', default: '' },
        { name: 'arialabel', type: 'string', label: 'Aria Label', default: '' },
    ],
}
