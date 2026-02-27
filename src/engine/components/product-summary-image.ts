import type { VtexComponentDefinition } from '../types'

export const productSummaryImage: VtexComponentDefinition = {
    type: 'product-summary-image',
    label: 'Product Summary Image',
    icon: 'ImageIcon',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'showBadge',
            type: 'boolean',
            label: 'Show Badge',
            default: true,
            description: 'Determines whether a discount badge is displayed on the product image.'
        },
        {
            name: 'badgeText',
            type: 'string',
            label: 'Badge Text',
            default: '',
            description: 'Specify the text to be displayed on the discount badge.'
        },
        {
            name: 'displayMode',
            type: 'enum',
            label: 'Display Mode',
            default: 'normal',
            options: [
                { value: 'normal', label: 'Normal' },
                { value: 'inline', label: 'Inline' }
            ]
        },
        {
            name: 'placeholder',
            type: 'string',
            label: 'Placeholder URL',
            default: '',
            description: 'Defines the placeholder image.'
        },
        {
            name: 'mainImageLabel',
            type: 'string',
            label: 'Main Image Label',
            default: '',
            description: 'Matches the value defined in the imageLabel field from the Admin Catalog.'
        },
        {
            name: 'hoverImage',
            type: 'object',
            label: 'Hover Image',
            default: undefined,
            objectSchema: [
                {
                    name: 'criteria',
                    type: 'enum',
                    label: 'Criteria',
                    default: 'label',
                    options: [
                        { value: 'label', label: 'Label' },
                        { value: 'index', label: 'Index' }
                    ]
                },
                {
                    name: 'label',
                    type: 'string',
                    label: 'Label',
                    default: '',
                    description: 'Matches the image label value.'
                },
                {
                    name: 'labelMatchCriteria',
                    type: 'enum',
                    label: 'Label Match Criteria',
                    default: 'exact',
                    options: [
                        { value: 'exact', label: 'Exact' },
                        { value: 'contains', label: 'Contains' }
                    ]
                },
                {
                    name: 'index',
                    type: 'number',
                    label: 'Index',
                    default: 0
                }
            ]
        },
        {
            name: 'width',
            type: 'object',
            label: 'Width',
            default: undefined,
            objectSchema: [
                { name: 'desktop', type: 'number', label: 'Desktop Width', default: undefined },
                { name: 'mobile', type: 'number', label: 'Mobile Width', default: undefined }
            ]
        },
        {
            name: 'height',
            type: 'object',
            label: 'Height',
            default: undefined,
            objectSchema: [
                { name: 'desktop', type: 'number', label: 'Desktop Height', default: undefined },
                { name: 'mobile', type: 'number', label: 'Mobile Height', default: undefined }
            ]
        },
        {
            name: 'aspectRatio',
            type: 'object',
            label: 'Aspect Ratio',
            default: undefined,
            objectSchema: [
                { name: 'desktop', type: 'string', label: 'Desktop Aspect Ratio', default: '' },
                { name: 'mobile', type: 'string', label: 'Mobile Aspect Ratio', default: '' }
            ]
        },
        {
            name: 'maxHeight',
            type: 'object',
            label: 'Max Height',
            default: undefined,
            objectSchema: [
                { name: 'desktop', type: 'number', label: 'Desktop Max Height', default: undefined },
                { name: 'mobile', type: 'number', label: 'Mobile Max Height', default: undefined }
            ]
        },
        {
            name: 'fetchpriority',
            type: 'enum',
            label: 'Fetch Priority',
            default: 'byPosition',
            options: [
                { value: 'high', label: 'High' },
                { value: 'low', label: 'Low' },
                { value: 'auto', label: 'Auto' },
                { value: 'byPosition', label: 'By Position' }
            ]
        }
    ]
}
