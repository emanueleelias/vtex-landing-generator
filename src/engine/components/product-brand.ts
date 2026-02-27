import type { VtexComponentDefinition } from '../types'

export const productBrand: VtexComponentDefinition = {
    type: 'product-brand',
    label: 'Product Brand',
    icon: 'Tag',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'brandId',
            type: 'number',
            label: 'Brand ID',
            default: undefined,
            description: 'The brand ID. If no value is declared, the product context should provide the data.'
        },
        {
            name: 'brandName',
            type: 'string',
            label: 'Brand Name',
            default: undefined,
            description: 'The brand name. If no value is declared, the product context should provide the data.'
        },
        {
            name: 'displayMode',
            type: 'enum',
            label: 'Display Mode',
            default: 'logo',
            options: [
                { value: 'logo', label: 'Logo' },
                { value: 'text', label: 'Text' }
            ]
        },
        {
            name: 'fallbackToText',
            type: 'boolean',
            label: 'Fallback to Text',
            default: true,
            description: 'If set to display a brand logo but no image is registered, replace with the brand name.'
        },
        {
            name: 'height',
            type: 'number',
            label: 'Logo Height',
            default: 100,
            description: 'The logo height. Available for logo display mode.'
        },
        {
            name: 'loadingPlaceholder',
            type: 'enum',
            label: 'Loading Placeholder',
            default: undefined,
            options: [
                { value: 'logo', label: 'Logo' },
                { value: 'text', label: 'Text' }
            ]
        },
        {
            name: 'withLink',
            type: 'enum',
            label: 'With Link',
            default: 'none',
            options: [
                { value: 'none', label: 'None' },
                { value: 'logo', label: 'Logo' },
                { value: 'text', label: 'Text' },
                { value: 'logoAndText', label: 'Logo and Text' }
            ]
        }
    ]
}
