import type { VtexComponentDefinition } from '../types'

export const productName: VtexComponentDefinition = {
    type: 'product-name',
    label: 'Product Name',
    icon: 'CaseSensitive',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'displayMode',
            type: 'enum',
            label: 'Display Mode',
            default: 'plainText',
            options: [
                { value: 'plainText', label: 'Plain Text' },
                { value: 'linkToProductPage', label: 'Link to Product Page' }
            ]
        },
        {
            name: 'showBrandName',
            type: 'boolean',
            label: 'Show Brand Name',
            default: false
        },
        {
            name: 'showProductReference',
            type: 'boolean',
            label: 'Show Product Reference',
            default: false
        },
        {
            name: 'showSku',
            type: 'boolean',
            label: 'Show SKU',
            default: false
        },
        {
            name: 'showSponsoredBadge',
            type: 'boolean',
            label: 'Show Sponsored Badge',
            default: false
        },
        {
            name: 'sponsoredBadgeLabel',
            type: 'string',
            label: 'Sponsored Badge Label',
            default: ''
        },
        {
            name: 'tag',
            type: 'enum',
            label: 'HTML Tag',
            default: 'div',
            options: [
                { value: 'div', label: 'div' },
                { value: 'h1', label: 'h1' },
                { value: 'h2', label: 'h2' },
                { value: 'h3', label: 'h3' }
            ]
        }
    ]
}
