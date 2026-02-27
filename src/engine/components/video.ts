import type { VtexComponentDefinition } from '../types'

export const video: VtexComponentDefinition = {
    type: 'video',
    label: 'Video',
    icon: 'Video',
    category: 'content',
    acceptsChildren: false,
    propsSchema: [
        { name: 'src', type: 'string', label: 'Source (URL)', default: '' },
        { name: 'type', type: 'string', label: 'Video Type (e.g. video/mp4)', default: '' },
        { name: 'width', type: 'string', label: 'Width (e.g. 100%, 600)', default: '100%' },
        { name: 'height', type: 'string', label: 'Height (e.g. 100%, 400)', default: '400px' },
        { name: 'autoPlay', type: 'boolean', label: 'Auto Play', default: false },
        { name: 'muted', type: 'boolean', label: 'Muted', default: false },
        { name: 'loop', type: 'boolean', label: 'Loop', default: false },
        { name: 'playsInline', type: 'boolean', label: 'Plays Inline', default: false },
        {
            name: 'controlsType',
            type: 'enum',
            label: 'Controls Type',
            default: 'native',
            options: [
                { value: 'native', label: 'Native' },
                { value: 'custom-vtex', label: 'Custom VTEX' },
                { value: 'none', label: 'None' },
            ],
        },
        { name: 'poster', type: 'string', label: 'Poster (URL)', default: '' },
        { name: 'name', type: 'string', label: 'Video Name (SEO)', default: '' },
        { name: 'description', type: 'string', label: 'Description (SEO)', default: '' },
        { name: 'PlayIcon', type: 'string', label: 'Play Icon', default: 'icon-play' },
        { name: 'PauseIcon', type: 'string', label: 'Pause Icon', default: 'icon-pause' },
        { name: 'VolumeOnIcon', type: 'string', label: 'Volume On Icon', default: 'icon-volume-on' },
        { name: 'VolumeOffIcon', type: 'string', label: 'Volume Off Icon', default: 'icon-volume-off' },
        { name: 'FullscreenIcon', type: 'string', label: 'Fullscreen Icon', default: 'icon-extend' },
        { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
    ],
}
