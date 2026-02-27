import type { VtexComponentDefinition } from '../types'

export const productIdentifierProduct: VtexComponentDefinition = {
    type: 'product-identifier.product',
    label: 'Product Identifier',
    icon: 'Barcode',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'label',
            type: 'enum',
            label: 'Label',
            default: 'default',
            options: [
                { value: 'default', label: 'Default' },
                { value: 'custom', label: 'Custom' },
                { value: 'hide', label: 'Hide' }
            ]
        },
        {
            name: 'customLabel',
            type: 'string',
            label: 'Custom Label',
            default: '',
            description: 'Text if label is set to custom.'
        },
        {
            name: 'idField',
            type: 'enum',
            label: 'ID Field',
            default: 'skuReferenceId',
            options: [
                { value: 'itemId', label: 'Item ID' },
                { value: 'productId', label: 'Product ID' },
                { value: 'productReference', label: 'Product Reference' },
                { value: 'skuEan', label: 'SKU EAN' },
                { value: 'skuReferenceId', label: 'SKU Reference ID' }
            ]
        }
    ]
}
