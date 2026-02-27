import type { VtexComponentDefinition } from '../types'

export const tabList: VtexComponentDefinition = {
    type: 'tab-list',
    label: 'Tab List',
    icon: 'List',
    category: 'layout',
    acceptsChildren: true,
    hidden: true,
    childrenTemplate: [
        { type: 'tab-list.item', props: { tabId: 'tab1', label: 'Tab 1', defaultActiveTab: true } },
        { type: 'tab-list.item', props: { tabId: 'tab2', label: 'Tab 2' } },
    ],
    propsSchema: [
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: '',
        },
    ],
}
