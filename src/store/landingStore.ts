import { create } from 'zustand'

export const TABS = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
} as const

export type TabKey = typeof TABS[keyof typeof TABS]

export interface BlockProps {
  title?: string
  subtitle?: string
  text?: string
  img1?: string
  img2?: string
  link?: string
}

export interface Block {
  id: string
  type: string
  props: BlockProps
  useContainer: boolean
  containerTitle: string
}

interface LandingState {
  landingName: string
  desktopBlocks: Block[]
  mobileBlocks: Block[]
  selectedBlockId: string | null
  selectedTab: TabKey

  setLandingName: (name: string) => void
  setTab: (tab: TabKey) => void
  selectBlock: (blockId: string) => void
  addBlock: (blockType: string, defaultProps: BlockProps) => void
  removeBlock: (blockId: string) => void
  moveBlock: (blockId: string, direction: number) => void
  updateBlockProps: (blockId: string, newProps: Partial<BlockProps>) => void
  toggleContainer: (blockId: string) => void
  setContainerTitle: (blockId: string, title: string) => void
  duplicateBlock: (blockId: string) => void
  getSelectedBlock: () => Block | null
}

let blockCounter = 0

function generateBlockId() {
  blockCounter++
  return `block-${Date.now()}-${blockCounter}`
}

const useLandingStore = create<LandingState>((set, get) => ({
  // Estado
  landingName: 'mi-landing',
  desktopBlocks: [],
  mobileBlocks: [],
  selectedBlockId: null,
  selectedTab: TABS.DESKTOP,

  // --- Acciones ---

  setLandingName: (name) => {
    // Slugificar el nombre
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    set({ landingName: slug || 'mi-landing' })
  },

  setTab: (tab) => set({ selectedTab: tab, selectedBlockId: null }),

  selectBlock: (blockId) => set({ selectedBlockId: blockId }),

  addBlock: (blockType, defaultProps) => {
    const { selectedTab } = get()
    const newBlock: Block = {
      id: generateBlockId(),
      type: blockType,
      props: { ...defaultProps },
      useContainer: true,
      containerTitle: '',
    }

    if (selectedTab === TABS.DESKTOP) {
      set((state) => ({
        desktopBlocks: [...state.desktopBlocks, newBlock],
        selectedBlockId: newBlock.id,
      }))
    } else {
      set((state) => ({
        mobileBlocks: [...state.mobileBlocks, newBlock],
        selectedBlockId: newBlock.id,
      }))
    }
  },

  removeBlock: (blockId) => {
    set((state) => ({
      desktopBlocks: state.desktopBlocks.filter((b) => b.id !== blockId),
      mobileBlocks: state.mobileBlocks.filter((b) => b.id !== blockId),
      selectedBlockId:
        state.selectedBlockId === blockId ? null : state.selectedBlockId,
    }))
  },

  moveBlock: (blockId, direction) => {
    const { selectedTab } = get()
    const key = selectedTab === TABS.DESKTOP ? 'desktopBlocks' : 'mobileBlocks'

    set((state) => {
      const blocks = [...state[key]]
      const index = blocks.findIndex((b) => b.id === blockId)
      if (index === -1) return state

      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= blocks.length) return state

        // Swap
        ;[blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]]
      return { [key]: blocks }
    })
  },

  updateBlockProps: (blockId, newProps) => {
    set((state) => ({
      desktopBlocks: state.desktopBlocks.map((b) =>
        b.id === blockId ? { ...b, props: { ...b.props, ...newProps } } : b
      ),
      mobileBlocks: state.mobileBlocks.map((b) =>
        b.id === blockId ? { ...b, props: { ...b.props, ...newProps } } : b
      ),
    }))
  },

  toggleContainer: (blockId) => {
    set((state) => ({
      desktopBlocks: state.desktopBlocks.map((b) =>
        b.id === blockId ? { ...b, useContainer: !b.useContainer } : b
      ),
      mobileBlocks: state.mobileBlocks.map((b) =>
        b.id === blockId ? { ...b, useContainer: !b.useContainer } : b
      ),
    }))
  },

  setContainerTitle: (blockId, title) => {
    set((state) => ({
      desktopBlocks: state.desktopBlocks.map((b) =>
        b.id === blockId ? { ...b, containerTitle: title } : b
      ),
      mobileBlocks: state.mobileBlocks.map((b) =>
        b.id === blockId ? { ...b, containerTitle: title } : b
      ),
    }))
  },

  // Duplicar un bloque
  duplicateBlock: (blockId) => {
    const { selectedTab, desktopBlocks, mobileBlocks } = get()
    const blocks = selectedTab === TABS.DESKTOP ? desktopBlocks : mobileBlocks
    const block = blocks.find((b) => b.id === blockId)
    if (!block) return

    const newBlock: Block = {
      ...block,
      id: generateBlockId(),
      props: { ...block.props },
    }

    const key = selectedTab === TABS.DESKTOP ? 'desktopBlocks' : 'mobileBlocks'
    const index = blocks.findIndex((b) => b.id === blockId)

    set((state) => {
      const updated = [...state[key]]
      updated.splice(index + 1, 0, newBlock)
      return { [key]: updated, selectedBlockId: newBlock.id }
    })
  },

  // Obtener el bloque seleccionado
  getSelectedBlock: () => {
    const { selectedBlockId, desktopBlocks, mobileBlocks } = get()
    if (!selectedBlockId) return null
    return (
      desktopBlocks.find((b) => b.id === selectedBlockId) ||
      mobileBlocks.find((b) => b.id === selectedBlockId) ||
      null
    )
  },
}))

export default useLandingStore
