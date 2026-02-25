import { BlockProps } from '../../store/landingStore'

export interface BlockDefinition {
    type: string
    label: string
    description: string
    icon: 'Type' | 'Columns' | 'Image' | 'FileImage' | 'ImageIcon' | 'PanelTop'
    defaultProps: BlockProps
    shared: boolean
    generateNodes?: (id: string, landingName: string, props: BlockProps, index: number) => { rootKey: string; nodes: any }
    generateDesktopNodes?: (id: string, landingName: string, props: BlockProps, index: number) => { rootKey: string; nodes: any }
    generateMobileNodes?: (id: string, landingName: string, props: BlockProps, index: number) => { rootKey: string; nodes: any }
}
