import type { VtexComponentDefinition } from '../types'

export const tabListItem: VtexComponentDefinition = {
    type: 'tab-list.item',
    label: 'Tab List Item',
    icon: 'Tag',
    category: 'content',
    acceptsChildren: false,
    hidden: true,
    propsSchema: [
        {
            name: 'tabId',
            type: 'string',
            label: 'Tab ID',
            default: '',
        },
        {
            name: 'label',
            type: 'string',
            label: 'Label',
            default: 'Tab Label',
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
