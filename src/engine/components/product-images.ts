import type { VtexComponentDefinition } from '../types'

export const productImages: VtexComponentDefinition = {
    type: 'product-images',
    label: 'Product Images',
    icon: 'Images',
    category: 'product',
    acceptsChildren: false,
    propsSchema: [
        {
            name: 'displayMode',
            type: 'enum',
            label: 'Display Mode',
            default: 'carousel',
            options: [
                { value: 'carousel', label: 'Carousel' },
                { value: 'list', label: 'List' },
                { value: 'first-image', label: 'First Image' }
            ]
        },
        {
            name: 'aspectRatio',
            type: 'string',
            label: 'Aspect Ratio',
            default: 'auto',
            description: 'Example: 1:1, 3:4, 16:9'
        },
        {
            name: 'maxHeight',
            type: 'number',
            label: 'Max Height (px)',
            default: 600
        },
        {
            name: 'contentOrder',
            type: 'enum',
            label: 'Content Order',
            default: 'images-first',
            options: [
                { value: 'images-first', label: 'Images First' },
                { value: 'videos-first', label: 'Videos First' }
            ]
        },
        {
            name: 'contentType',
            type: 'enum',
            label: 'Content Type',
            default: 'all',
            options: [
                { value: 'all', label: 'All' },
                { value: 'images', label: 'Images' },
                { value: 'videos', label: 'Videos' }
            ]
        },
        {
            name: 'zoomMode',
            type: 'enum',
            label: 'Zoom Mode',
            default: 'in-place-hover',
            options: [
                { value: 'disabled', label: 'Disabled' },
                { value: 'in-place-click', label: 'In-place Click' },
                { value: 'in-place-hover', label: 'In-place Hover' },
                { value: 'open-modal', label: 'Open Modal' }
            ]
        },
        {
            name: 'zoomFactor',
            type: 'number',
            label: 'Zoom Factor',
            default: 2
        },
        {
            name: 'thumbnailsOrientation',
            type: 'enum',
            label: 'Thumbnails Orientation',
            default: 'vertical',
            options: [
                { value: 'vertical', label: 'Vertical' },
                { value: 'horizontal', label: 'Horizontal' }
            ]
        },
        {
            name: 'position',
            type: 'enum',
            label: 'Thumbnails Position',
            default: 'left',
            options: [
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' }
            ]
        },
        {
            name: 'thumbnailVisibility',
            type: 'enum',
            label: 'Thumbnail Visibility',
            default: 'visible',
            options: [
                { value: 'visible', label: 'Visible' },
                { value: 'hidden', label: 'Hidden' }
            ]
        },
        {
            name: 'showNavigationArrows',
            type: 'boolean',
            label: 'Show Navigation Arrows',
            default: true
        },
        {
            name: 'showPaginationDots',
            type: 'boolean',
            label: 'Show Pagination Dots',
            default: true
        },
        {
            name: 'displayThumbnailsArrows',
            type: 'boolean',
            label: 'Display Thumbnails Arrows',
            default: false
        },
        {
            name: 'placeholder',
            type: 'string',
            label: 'Placeholder URL',
            default: ''
        },
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: ''
        }
    ]
}
