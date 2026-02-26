import type { VtexComponentDefinition } from '../types'

export const sliderLayout: VtexComponentDefinition = {
    type: 'slider-layout',
    label: 'Slider Layout',
    icon: 'GalleryHorizontalEnd', // An icon that represents a slider
    category: 'layout',
    acceptsChildren: true,
    propsSchema: [
        { name: 'blockClass', type: 'string', label: 'Block Class', default: 'carousel' },
        { name: 'label', type: 'string', label: 'Aria Label', default: 'slider' },
        {
            name: 'showNavigationArrows',
            type: 'enum',
            label: 'Show Nav Arrows',
            default: 'always',
            options: [
                { value: 'mobileOnly', label: 'Mobile Only' },
                { value: 'desktopOnly', label: 'Desktop Only' },
                { value: 'always', label: 'Always' },
                { value: 'never', label: 'Never' },
            ],
        },
        {
            name: 'showPaginationDots',
            type: 'enum',
            label: 'Show Pagination',
            default: 'always',
            options: [
                { value: 'mobileOnly', label: 'Mobile Only' },
                { value: 'desktopOnly', label: 'Desktop Only' },
                { value: 'always', label: 'Always' },
                { value: 'never', label: 'Never' },
            ],
        },
        { name: 'infinite', type: 'boolean', label: 'Infinite', default: false },
        { name: 'usePagination', type: 'boolean', label: 'Use Pagination', default: true },
        { name: 'fullWidth', type: 'boolean', label: 'Full Width', default: true },
        {
            name: 'itemsPerPage',
            type: 'object',
            label: 'Items Per Page',
            default: { desktop: 5, tablet: 3, phone: 1 },
            objectSchema: [
                { name: 'desktop', type: 'number', label: 'Desktop', default: 5 },
                { name: 'tablet', type: 'number', label: 'Tablet', default: 3 },
                { name: 'phone', type: 'number', label: 'Phone', default: 1 },
            ],
        },
        {
            name: 'slideTransition',
            type: 'object',
            label: 'Slide Transition',
            default: { speed: 400, delay: 0, timing: '' },
            objectSchema: [
                { name: 'speed', type: 'number', label: 'Speed (ms)', default: 400 },
                { name: 'delay', type: 'number', label: 'Delay (ms)', default: 0 },
                { name: 'timing', type: 'string', label: 'Timing', default: '' },
            ],
        },
        {
            name: 'autoplay',
            type: 'object',
            label: 'Autoplay',
            default: { timeout: 0, stopOnHover: true },
            objectSchema: [
                { name: 'timeout', type: 'number', label: 'Timeout (ms, 0 = disabled)', default: 0 },
                { name: 'stopOnHover', type: 'boolean', label: 'Stop on Hover', default: true },
            ],
        },
        {
            name: 'centerMode',
            type: 'enum',
            label: 'Center Mode',
            default: 'disabled',
            options: [
                { value: 'disabled', label: 'Disabled' },
                { value: 'center', label: 'Center' },
                { value: 'to-the-left', label: 'To The Left' },
            ]
        },
        { name: 'centerModeSlidesGap', type: 'number', label: 'Center Slides Gap', default: 0 },
        { name: 'arrowSize', type: 'number', label: 'Arrow Size', default: 25 },
    ],
}
