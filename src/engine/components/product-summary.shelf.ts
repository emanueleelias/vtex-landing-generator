import type { VtexComponentDefinition } from '../types'

export const productSummaryShelf: VtexComponentDefinition = {
    type: 'product-summary.shelf',
    label: 'Product Summary',
    icon: 'Package',
    category: 'layout',
    acceptsChildren: true,
    acceptsBlocks: false,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'blockClass', default: '' }
    ],
}
