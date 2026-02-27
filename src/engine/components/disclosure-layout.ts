import type { VtexComponentDefinition } from '../types'

export const disclosureLayout: VtexComponentDefinition = {
    type: 'disclosure-layout',
    label: 'Disclosure Layout',
    icon: 'ListTree',
    category: 'layout',
    acceptsChildren: true,
    childrenTemplate: [
        { type: 'disclosure-trigger' },
        { type: 'disclosure-content' },
    ],
    propsSchema: [
        {
            name: 'initialVisibility',
            type: 'enum',
            label: 'Initial Visibility',
            default: 'hidden',
            options: [
                { value: 'visible', label: 'Visible' },
                { value: 'hidden', label: 'Hidden' },
            ],
        },
        {
            name: 'animated',
            type: 'boolean',
            label: 'Animated',
            default: false,
        },
    ],
}
