import type { VtexComponentDefinition } from '../types'

export const disclosureLayoutGroup: VtexComponentDefinition = {
    type: 'disclosure-layout-group',
    label: 'Disclosure Group',
    icon: 'Layers',
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        {
            name: 'maxVisible',
            type: 'enum',
            label: 'Max Visible',
            default: 'one',
            options: [
                { value: 'one', label: 'One' },
                { value: 'many', label: 'Many' },
            ],
        },
    ],
}
