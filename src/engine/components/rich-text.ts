import type { VtexComponentDefinition } from '../types'

export const richText: VtexComponentDefinition = {
    type: 'rich-text',
    label: 'Rich Text',
    icon: 'Type',
    category: 'content',
    acceptsChildren: false,
    propsSchema: [
        { name: 'text', type: 'string', label: 'Texto (Markdown)', default: '' },
        {
            name: 'textAlignment',
            type: 'enum',
            label: 'Text Alignment',
            default: 'LEFT',
            options: [
                { value: 'LEFT', label: 'Left' },
                { value: 'CENTER', label: 'Center' },
                { value: 'RIGHT', label: 'Right' },
            ],
        },
        {
            name: 'textPosition',
            type: 'enum',
            label: 'Text Position',
            default: 'LEFT',
            options: [
                { value: 'LEFT', label: 'Left' },
                { value: 'CENTER', label: 'Center' },
                { value: 'RIGHT', label: 'Right' },
            ],
        },
        { name: 'textColor', type: 'string', label: 'Text Color (Tachyon)', default: 'c-on-base' },
        { name: 'font', type: 'string', label: 'Font (Tachyon)', default: 't-body' },
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
    ],
}
