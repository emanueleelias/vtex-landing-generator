import type { VtexComponentDefinition } from '../types'

export const conditionLayoutBinding: VtexComponentDefinition = {
    type: 'condition-layout.binding',
    label: 'Condition Binding',
    icon: 'Split',
    category: 'layout',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'conditions',
            type: 'conditions',
            label: 'Conditions',
            default: undefined,
            conditionsContext: 'binding',
        },
        {
            name: 'matchType',
            type: 'enum',
            label: 'Match Type',
            default: 'all',
            options: [
                { value: 'all', label: 'All' },
                { value: 'any', label: 'Any' },
                { value: 'none', label: 'None' },
            ],
        },
        { name: 'Then', type: 'string', label: 'Then Block Name', default: '', forceRender: true },
        { name: 'Else', type: 'string', label: 'Else Block Name', default: '', forceRender: true },
    ],
}
