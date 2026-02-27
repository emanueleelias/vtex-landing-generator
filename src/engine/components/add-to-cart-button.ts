import type { VtexComponentDefinition } from '../types'

export const addToCartButton: VtexComponentDefinition = {
    type: 'add-to-cart-button',
    label: 'Add To Cart Button',
    icon: 'ShoppingCart',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'text',
            type: 'string',
            label: 'Button Text',
            default: 'Add to cart',
            description: 'Custom text for the button.'
        },
        {
            name: 'unavailableText',
            type: 'string',
            label: 'Unavailable Text',
            default: 'Unavailable',
            description: 'Text to display when the product is unavailable.'
        },
        {
            name: 'onClickBehavior',
            type: 'enum',
            label: 'On Click Behavior',
            default: 'add-to-cart',
            options: [
                { value: 'add-to-cart', label: 'Add to Cart' },
                { value: 'go-to-product-page', label: 'Go to Product Page' },
                { value: 'ensure-sku-selection', label: 'Ensure SKU Selection' },
                { value: 'add-to-cart-and-trigger-shipping-modal', label: 'Add to Cart & Shipping Modal' }
            ]
        },
        {
            name: 'isOneClickBuy',
            type: 'boolean',
            label: 'Is One Click Buy',
            default: false
        },
        {
            name: 'customOneClickBuyLink',
            type: 'string',
            label: 'Custom One Click Buy Link',
            default: '/checkout/#/cart'
        },
        {
            name: 'customToastUrl',
            type: 'string',
            label: 'Custom Toast URL',
            default: '/checkout/#/cart'
        },
        {
            name: 'onClickEventPropagation',
            type: 'enum',
            label: 'On Click Event Propagation',
            default: 'disabled',
            options: [
                { value: 'disabled', label: 'Disabled' },
                { value: 'enabled', label: 'Enabled' }
            ]
        },
        {
            name: 'customPixelEventId',
            type: 'string',
            label: 'Custom Pixel Event ID',
            default: ''
        }
    ]
}
