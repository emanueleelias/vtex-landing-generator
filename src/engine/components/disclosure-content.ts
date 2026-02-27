import type { VtexComponentDefinition } from '../types'

export const disclosureContent: VtexComponentDefinition = {
    type: 'disclosure-content',
    label: 'Disclosure Content',
    icon: 'Type',
    category: 'content',
    acceptsChildren: true,
    hidden: true,
    childrenTemplate: [
        { type: 'rich-text' }
    ],
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
    ],
}
