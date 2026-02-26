import type { VtexComponentDefinition } from '../types'

export const image: VtexComponentDefinition = {
    type: 'image',
    label: 'Image',
    icon: 'ImageIcon',
    category: 'media',
    acceptsChildren: false,
    propsSchema: [
        { name: 'src', type: 'string', label: 'URL de imagen (src)', default: '' },
        { name: 'alt', type: 'string', label: 'Texto alternativo (alt)', default: '' },
        { name: 'link', type: 'string', label: 'Link (URL destino)', default: '' },
        { name: 'maxWidth', type: 'string', label: 'Max Width', default: '100%' },
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
    ],
}
