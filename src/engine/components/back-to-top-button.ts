import type { VtexComponentDefinition } from '../types'

export const backToTopButton: VtexComponentDefinition = {
    type: 'back-to-top-button',
    label: 'Back To Top Button',
    icon: 'ArrowUpCircle',
    category: 'utility',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'display',
            type: 'enum',
            label: 'Display Mode',
            default: 'button',
            options: [
                { value: 'button', label: 'Button' },
                { value: 'caret-icon', label: 'Caret Icon' }
            ],
            description: 'Defines whether to display a labeled button or just an icon.'
        },
        {
            name: 'displayThreshold',
            type: 'number',
            label: 'Display Threshold (px)',
            default: 600,
            description: 'The scroll position (Y) at which the button appears.'
        }
    ]
}
