import type { VtexComponentDefinition } from '../types'

export const productSummaryBuyButton: VtexComponentDefinition = {
    type: 'product-summary-buy-button',
    label: 'Product Summary Buy Button',
    icon: 'ShoppingCart',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'isOneClickBuy',
            type: 'boolean',
            label: 'Is One Click Buy',
            default: false,
            description: 'Whether the user should be redirected to Checkout after clicking.'
        },
        {
            name: 'buyButtonText',
            type: 'string',
            label: 'Buy Button Text',
            default: '',
            description: 'Custom text that overwrites the default Buy Button text.'
        },
        {
            name: 'displayBuyButton',
            type: 'enum',
            label: 'Display Mode',
            default: 'displayButtonAlways',
            options: [
                { value: 'displayButtonAlways', label: 'Always Display' },
                { value: 'displayButtonHover', label: 'Display on Hover' },
                { value: 'displayButtonNone', label: 'Hidden' }
            ]
        },
        {
            name: 'customToastURL',
            type: 'string',
            label: 'Custom Toast URL',
            default: '/checkout/#/cart',
            description: 'Defines a redirect link to the Toast displayed when an item is added.'
        },
        {
            name: 'buyButtonBehavior',
            type: 'enum',
            label: 'Buy Button Behavior',
            default: 'default',
            options: [
                { value: 'alwaysGoToProduct', label: 'Always Go To Product' },
                { value: 'default', label: 'Default (Minicart)' },
                { value: 'alwaysAddToTheCart', label: 'Always Add To Cart' }
            ]
        }
    ]
}
