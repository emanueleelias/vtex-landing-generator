import type { VtexComponentDefinition } from '../types'

export const disclosureStateIndicator: VtexComponentDefinition = {
    type: 'disclosure-state-indicator',
    label: 'Disclosure State Indicator',
    icon: 'ToggleLeft',
    category: 'utility',
    acceptsChildren: false,
    propsSchema: [
        {
            name: '__topLevelOnly',
            type: 'boolean',
            label: 'Exportar Independiente (Raíz)',
            default: true,
            description: 'Si está activado, el componente no se anidará gráficamente en el código JSONC resultante (ideal para componentes como Iconos e Indicadores que deben ser referenciados).'
        },
        { name: 'Show', type: 'string', label: 'Show Block Name', default: 'icon-caret#down', forceRender: true },
        { name: 'Hide', type: 'string', label: 'Hide Block Name', default: 'icon-caret#up', forceRender: true },
    ],
}
