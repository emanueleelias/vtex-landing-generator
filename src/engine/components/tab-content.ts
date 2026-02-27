import type { VtexComponentDefinition } from '../types'

export const tabContent: VtexComponentDefinition = {
    type: 'tab-content',
    label: 'Tab Content',
    icon: 'Layout',
    category: 'layout',
    acceptsChildren: true,
    hidden: true,
    childrenTemplate: [
        { type: 'tab-content.item', props: { tabId: 'tab1' } },
        { type: 'tab-content.item', props: { tabId: 'tab2' } },
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
