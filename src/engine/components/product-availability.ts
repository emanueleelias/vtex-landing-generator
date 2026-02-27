import type { VtexComponentDefinition } from '../types'

export const productAvailability: VtexComponentDefinition = {
    type: 'product-availability',
    label: 'Product Availability',
    icon: 'CheckCircle2',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'threshold',
            type: 'number',
            label: 'Threshold',
            default: 0,
            description: 'Minimum product quantity that makes the low stock message to be displayed.'
        },
        {
            name: 'lowStockMessage',
            type: 'string',
            label: 'Low Stock Message',
            default: '',
            description: 'Message to be displayed when stock is lower than threshold. Use {quantity} as placeholder.'
        },
        {
            name: 'highStockMessage',
            type: 'string',
            label: 'High Stock Message',
            default: '',
            description: 'Message to be displayed when stock is higher or equal to threshold.'
        }
    ]
}
