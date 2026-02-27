import type { VtexComponentDefinition } from '../types'

export const tabLayout: VtexComponentDefinition = {
    type: 'tab-layout',
    label: 'Tab Layout',
    icon: 'FolderTabs',
    category: 'layout',
    acceptsChildren: true,
    childrenTemplate: [
        { type: 'tab-list' },
        { type: 'tab-content' },
    ],
    propsSchema: [
        {
            name: '__tabCount',
            type: 'stepper',
            label: 'Cantidad de Tabs',
            default: 2,
            min: 1,
            max: 10,
            description: 'Cantidad de pestañas a generar',
        },
        {
            name: '__useItemChildren',
            type: 'boolean',
            label: 'Usar Item Children',
            default: false,
            description: 'Permite usar bloques personalizados como título de cada tab',
        },
        {
            name: 'defaultActiveTabId',
            type: 'string',
            label: 'Default Active Tab ID',
            default: 'tab1',
        },
        {
            name: 'blockClass',
            type: 'string',
            label: 'Block Class',
            default: '',
        },
    ],
}
