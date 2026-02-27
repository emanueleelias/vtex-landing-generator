import type { VtexComponentDefinition } from '../types'

export const modalTrigger: VtexComponentDefinition = {
    type: 'modal-trigger',
    label: 'Modal Layout',
    icon: 'AppWindowMac',
    category: 'layout',
    acceptsChildren: true,
    childrenTemplate: [
        { type: 'rich-text', props: { text: 'Click me' } },
        { type: 'modal-layout' },
    ],
    propsSchema: [
        {
            name: 'trigger',
            type: 'enum',
            label: 'Trigger Event',
            default: 'click',
            options: [
                { value: 'click', label: 'Click' },
                { value: 'load', label: 'Load' },
                { value: 'load-session', label: 'Load Session' },
            ],
            description: 'Defines whether the modal is triggered by user click, on load, or limit once per session',
        },
        {
            name: 'customPixelEventId',
            type: 'string',
            label: 'Custom Pixel Event Id',
            default: '',
        },
        {
            name: 'customPixelEventName',
            type: 'string',
            label: 'Custom Pixel Event Name',
            default: '',
        },
    ],
}
