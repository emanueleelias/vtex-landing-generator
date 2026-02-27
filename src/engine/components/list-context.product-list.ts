import type { VtexComponentDefinition } from '../types'

export const listContextProductList: VtexComponentDefinition = {
    type: 'list-context.product-list',
    label: 'Product List',
    icon: 'ListTree',
    category: 'product',
    acceptsChildren: true,
    acceptsBlocks: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'blockClass', default: '' },
        { name: 'orderBy', type: 'string', label: 'orderBy', default: 'OrderByTopSaleDESC' },
        { name: 'collection', type: 'string', label: 'collection', default: '' },
        { name: 'maxItems', type: 'number', label: 'maxItems', default: 12 },
    ],
}
