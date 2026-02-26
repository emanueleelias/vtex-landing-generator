/**
 * Registro central de componentes VTEX soportados.
 *
 * Para agregar un nuevo componente:
 *   1. Agregar un objeto VtexComponentDefinition a este array.
 *   2. Nada más. El canvas, panel de props y JSON generator lo manejan genéricamente.
 */
import type { VtexComponentDefinition } from './types'

const vtexComponents: VtexComponentDefinition[] = [
    // ──────────────────────────── LAYOUT ────────────────────────────
    {
        type: 'flex-layout.row',
        label: 'Flex Layout Row',
        icon: 'Rows3',
        category: 'layout',
        acceptsChildren: true,
        propsSchema: [
            { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
            { name: 'fullWidth', type: 'boolean', label: 'Full Width', default: false },
            {
                name: 'horizontalAlign',
                type: 'enum',
                label: 'Alineación horizontal',
                default: 'left',
                options: [
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                ],
            },
            { name: 'preventHorizontalStretch', type: 'boolean', label: 'Prevent Horizontal Stretch', default: false },
            { name: 'preventVerticalStretch', type: 'boolean', label: 'Prevent Vertical Stretch', default: false },
            { name: 'colGap', type: 'number', label: 'Column Gap', default: 0 },
            { name: 'paddingTop', type: 'number', label: 'Padding Top (0-10)', default: 0 },
            { name: 'paddingBottom', type: 'number', label: 'Padding Bottom (0-10)', default: 0 },
        ],
    },
    {
        type: 'flex-layout.col',
        label: 'Flex Layout Col',
        icon: 'Columns3',
        category: 'layout',
        acceptsChildren: true,
        propsSchema: [
            { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
            {
                name: 'horizontalAlign',
                type: 'enum',
                label: 'Alineación horizontal',
                default: 'left',
                options: [
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                ],
            },
            {
                name: 'verticalAlign',
                type: 'enum',
                label: 'Alineación vertical',
                default: 'top',
                options: [
                    { value: 'top', label: 'Top' },
                    { value: 'middle', label: 'Middle' },
                    { value: 'bottom', label: 'Bottom' },
                ],
            },
            { name: 'preventVerticalStretch', type: 'boolean', label: 'Prevent Vertical Stretch', default: false },
            { name: 'rowGap', type: 'number', label: 'Row Gap', default: 0 },
            { name: 'paddingTop', type: 'number', label: 'Padding Top (0-10)', default: 0 },
            { name: 'paddingBottom', type: 'number', label: 'Padding Bottom (0-10)', default: 0 },
        ],
    },
    {
        type: 'responsive-layout.desktop',
        label: 'Responsive Desktop',
        icon: 'Monitor',
        category: 'layout',
        acceptsChildren: true,
        propsSchema: [
            { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        ],
    },
    {
        type: 'responsive-layout.mobile',
        label: 'Responsive Mobile',
        icon: 'Smartphone',
        category: 'layout',
        acceptsChildren: true,
        propsSchema: [
            { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        ],
    },
    {
        type: 'custom-container',
        label: 'Custom Container',
        icon: 'Box',
        category: 'layout',
        acceptsChildren: true,
        propsSchema: [
            { name: 'active', type: 'boolean', label: 'Activo', default: true },
        ],
    },

    // ──────────────────────────── CONTENT ────────────────────────────
    {
        type: 'rich-text',
        label: 'Rich Text',
        icon: 'Type',
        category: 'content',
        acceptsChildren: false,
        propsSchema: [
            { name: 'text', type: 'string', label: 'Texto (Markdown)', default: '' },
            {
                name: 'textAlignment',
                type: 'enum',
                label: 'Text Alignment',
                default: 'LEFT',
                options: [
                    { value: 'LEFT', label: 'Left' },
                    { value: 'CENTER', label: 'Center' },
                    { value: 'RIGHT', label: 'Right' },
                ],
            },
            {
                name: 'textPosition',
                type: 'enum',
                label: 'Text Position',
                default: 'LEFT',
                options: [
                    { value: 'LEFT', label: 'Left' },
                    { value: 'CENTER', label: 'Center' },
                    { value: 'RIGHT', label: 'Right' },
                ],
            },
            { name: 'textColor', type: 'string', label: 'Text Color (Tachyon)', default: 'c-on-base' },
            { name: 'font', type: 'string', label: 'Font (Tachyon)', default: 't-body' },
            { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        ],
    },

    // ──────────────────────────── MEDIA ────────────────────────────
    {
        type: 'image',
        label: 'Image',
        icon: 'ImageIcon',
        category: 'media',
        acceptsChildren: false,
        propsSchema: [
            { name: 'src', type: 'string', label: 'URL de imagen (src)', default: '' },
            { name: 'alt', type: 'string', label: 'Texto alternativo (alt)', default: '' },
            { name: 'link', type: 'string', label: 'Link (URL destino)', default: '' },
            { name: 'maxWidth', type: 'string', label: 'Max Width', default: '100%' },
            { name: 'blockClass', type: 'string', label: 'Block Class', default: '' },
        ],
    },
]

export default vtexComponents

/**
 * Obtener definición de componente por tipo.
 */
export function getComponentDefinition(type: string): VtexComponentDefinition | undefined {
    return vtexComponents.find((c) => c.type === type)
}

/**
 * Obtener componentes agrupados por categoría.
 */
export function getComponentsByCategory() {
    const grouped: Record<string, VtexComponentDefinition[]> = {
        layout: [],
        content: [],
        media: [],
    }
    vtexComponents.forEach((c) => {
        grouped[c.category].push(c)
    })
    return grouped
}
