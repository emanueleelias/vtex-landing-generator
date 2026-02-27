import type { VtexComponentDefinition } from '../types'

export const modalLayout: VtexComponentDefinition = {
    type: 'modal-layout',
    label: 'Modal Layout',
    icon: 'AppWindowMac',
    category: 'layout',
    acceptsChildren: true,
    hidden: true,
    childrenTemplate: [
        { type: 'modal-header' },
        { type: 'modal-content' },
    ],
    propsSchema: [
        {
            name: '__showHeader',
            type: 'boolean',
            label: 'Show Header',
            default: true,
            description: 'Render the modal-header inside the modal layout',
        },
        {
            name: '__showActions',
            type: 'boolean',
            label: 'Show Actions',
            default: false,
            description: 'Render the modal-actions block inside the modal layout',
        },
        {
            name: 'scroll',
            type: 'enum',
            label: 'Scroll Mode',
            default: 'content',
            options: [
                { value: 'body', label: 'Body' },
                { value: 'content', label: 'Content' },
            ],
        },
        {
            name: 'disableEscapeKeyDown',
            type: 'boolean',
            label: 'Disable Esc Key',
            default: false,
        },
        {
            name: 'fullScreen',
            type: 'boolean',
            label: 'Full Screen',
            default: false,
        },
        {
            name: 'backdrop',
            type: 'enum',
            label: 'Backdrop',
            default: 'clickable',
            options: [
                { value: 'clickable', label: 'Clickable' },
                { value: 'none', label: 'None' },
            ],
        },
        {
            name: 'customPixelEventId',
            type: 'string',
            label: 'Custom Pixel Event ID',
            default: '',
            description: 'Close event by ID',
        },
        {
            name: 'customPixelEventName',
            type: 'string',
            label: 'Custom Pixel Event Name',
            default: '',
            description: 'Close event by Name',
        },
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: '',
        },
    ],
}
