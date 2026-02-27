import type { VtexComponentDefinition } from '../types'

export const productSummaryName: VtexComponentDefinition = {
    type: 'product-summary-name',
    label: 'Product Summary Name',
    icon: 'CaseSensitive',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'showFieldsProps',
            type: 'object',
            label: 'Show Fields',
            default: { showProductReference: false, showBrandName: false, showSku: false },
            objectSchema: [
                { name: 'showSku', type: 'boolean', label: 'Show SKU', default: false },
                { name: 'showProductReference', type: 'boolean', label: 'Show Product Reference', default: false },
                { name: 'showBrandName', type: 'boolean', label: 'Show Brand Name', default: false }
            ]
        },
        {
            name: 'tag',
            type: 'enum',
            label: 'HTML Tag',
            default: 'h1',
            options: [
                { value: 'div', label: 'div' },
                { value: 'h1', label: 'h1' },
                { value: 'h2', label: 'h2' },
                { value: 'h3', label: 'h3' }
            ]
        }
    ]
}
