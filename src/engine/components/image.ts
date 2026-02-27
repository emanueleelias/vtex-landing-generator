import type { VtexComponentDefinition } from '../types'

export const image: VtexComponentDefinition = {
    type: 'image',
    label: 'Image',
    icon: 'ImageIcon',
    category: 'content',
    acceptsChildren: false,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        { name: 'alt', type: 'string', label: 'Alt Text', default: '' },
        { name: 'maxHeight', type: 'string', label: 'Max Height', default: '' },
        { name: 'maxWidth', type: 'string', label: 'Max Width', default: '' },
        // { name: 'sizes', type: 'string', label: 'Sizes', default: '' },
        { name: 'src', type: 'string', label: 'Source (src)', default: 'https://dummyimage.com/360x360/D9D9D9/4c4c4c' },
        // { name: 'srcSet', type: 'string', label: 'Source Set (srcSet)', default: '' },
        { name: 'title', type: 'string', label: 'Title', default: '' },
        {
            name: 'link',
            type: 'object',
            label: 'Link',
            default: {},
            objectSchema: [
                { name: 'url', type: 'string', label: 'URL', default: '' },
                { name: 'attributeNofollow', type: 'boolean', label: 'No Follow', default: false },
                { name: 'newTab', type: 'boolean', label: 'Open in new tab', default: false },
            ],
        },
    ],
}
