import type { VtexComponentDefinition } from '../types'

export const disclosureTrigger: VtexComponentDefinition = {
    type: 'disclosure-trigger',
    label: 'Disclosure Trigger',
    icon: 'Type',
    category: 'content',
    acceptsChildren: true,
    hidden: true,
    childrenTemplate: [
        { type: 'rich-text' },
        { type: '__block-reference', props: { __targetKey: 'disclosure-state-indicator' } }
    ],
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        { name: 'as', type: 'string', label: 'Render As Tag', default: 'button' },
        { name: 'Show', type: 'string', label: 'Show Block Name', default: '' },
        { name: 'Hide', type: 'string', label: 'Hide Block Name', default: '' },
    ],
}
