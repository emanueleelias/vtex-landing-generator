import type { VtexComponentDefinition } from '../types'

export const tabListItemChildren: VtexComponentDefinition = {
    type: 'tab-list.item.children',
    label: 'Tab List Item (Children)',
    icon: 'Tag',
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
            name: 'defaultActiveTab',
            type: 'boolean',
            label: 'Default Active Tab',
            default: false,
        },
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: '',
        },
    ],
}
