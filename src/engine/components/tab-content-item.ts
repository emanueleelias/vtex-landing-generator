import type { VtexComponentDefinition } from '../types'

export const tabContentItem: VtexComponentDefinition = {
    type: 'tab-content.item',
    label: 'Tab Content Item',
    icon: 'Square',
    category: 'layout',
    acceptsChildren: true,
    hidden: true,
    propsSchema: [
        {
            name: 'tabId',
            type: 'string',
            label: 'Tab ID',
            default: '',
        },
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: '',
        },
    ],
}
