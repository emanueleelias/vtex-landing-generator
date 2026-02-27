import type { VtexComponentDefinition } from '../types'

export const productDescription: VtexComponentDefinition = {
    type: 'product-description',
    label: 'Product Description',
    icon: 'FileText',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'collapseContent',
            type: 'boolean',
            label: 'Collapse Content',
            default: true,
            description: 'If true, long descriptions will collapse and show a "Show More" button.'
        },
        {
            name: 'showTitle',
            type: 'boolean',
            label: 'Show Title',
            default: true,
            description: 'Define whether or not to show the title.'
        },
        {
            name: 'title',
            type: 'string',
            label: 'Title',
            default: '',
            description: 'Defines a custom title for the description section.'
        }
    ]
}
