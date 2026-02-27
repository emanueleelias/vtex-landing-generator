import type { VtexComponentDefinition } from '../types'

export const disclosureTriggerGroup: VtexComponentDefinition = {
    type: 'disclosure-trigger-group',
    label: 'Disclosure Trigger Group',
    icon: 'Type',
    category: 'content',
    acceptsChildren: true,
    hidden: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        { name: 'as', type: 'string', label: 'Render As Tag', default: 'button' },
        { name: 'Show', type: 'string', label: 'Show Block Name', default: '' },
        { name: 'Hide', type: 'string', label: 'Hide Block Name', default: '' },
    ],
}
