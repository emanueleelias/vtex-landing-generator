import type { VtexComponentDefinition } from '../types'

export const iconCaret: VtexComponentDefinition = {
    type: 'icon-caret',
    label: 'Icon Caret',
    icon: 'ImageIcon',
    category: 'media',
    acceptsChildren: false,
    propsSchema: [
        {
            name: '__topLevelOnly',
            type: 'boolean',
            label: 'Exportar Independiente (Raíz)',
            default: true,
            description: 'Si está activado, el componente no se anidará gráficamente en el código JSONC resultante (útil si se va a referenciar globalmente).'
        },
        {
            name: 'orientation',
            type: 'enum',
            label: 'Orientation',
            default: 'down',
            forceRender: true,
            options: [
                { value: 'up', label: 'Up' },
                { value: 'down', label: 'Down' },
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' },
            ]
        },
        { name: 'size', type: 'number', label: 'Size', default: 16 },
        { name: 'activeClassName', type: 'string', label: 'Active Class Name', default: '' },
        { name: 'mutedClassName', type: 'string', label: 'Muted Class Name', default: '' },
    ],
}
