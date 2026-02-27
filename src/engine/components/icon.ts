import type { VtexComponentDefinition } from '../types'

export const icon: VtexComponentDefinition = {
    type: 'icon',
    label: 'Icon',
    icon: 'Smile',
    category: 'content',
    acceptsChildren: false,
    propsSchema: [
        {
            name: '__topLevelOnly',
            type: 'boolean',
            label: 'Exportar Independiente (Raíz)',
            default: true,
            description: 'Si está activado, el componente no se anidará gráficamente en el código JSONC resultante (útil si se va a referenciar globalmente).'
        },
        { name: 'id', type: 'string', label: 'Icon ID (e.g. up, down)', default: '' },
        { name: 'size', type: 'number', label: 'Size', default: 16 },
        { name: 'viewBox', type: 'string', label: 'ViewBox', default: '0 0 16 16' },
        { name: 'activeClassName', type: 'string', label: 'Active Class Name', default: '' },
        { name: 'mutedClassName', type: 'string', label: 'Muted Class Name', default: '' },
        {
            name: 'orientation',
            type: 'enum',
            label: 'Orientation',
            default: 'up',
            options: [
                { value: 'up', label: 'Up' },
                { value: 'down', label: 'Down' },
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' },
            ]
        }
    ],
}
