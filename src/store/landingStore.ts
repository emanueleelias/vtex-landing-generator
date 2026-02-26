import { create } from 'zustand'
import type { TreeNode } from '../engine/types'
import { getComponentDefinition } from '../engine/vtexComponents'

export type GenerationMode = 'landing' | 'block'

interface LandingState {
  landingName: string
  generationMode: GenerationMode
  tree: TreeNode[]
  selectedNodeId: string | null
  theme: 'dark' | 'light'

  setLandingName: (name: string) => void
  setGenerationMode: (mode: GenerationMode) => void
  selectNode: (nodeId: string | null) => void
  addNode: (parentId: string | null, componentType: string) => void
  removeNode: (nodeId: string) => void
  moveNode: (nodeId: string, direction: number) => void
  updateNodeProps: (nodeId: string, props: Record<string, any>) => void
  updateNodeIdentifier: (nodeId: string, identifier: string) => void
  updateNodeTitle: (nodeId: string, title: string) => void
  getSelectedNode: () => TreeNode | null

  // DnD actions
  insertNodeAtIndex: (parentId: string | null, index: number, componentType: string) => void
  moveNodeTo: (nodeId: string, newParentId: string | null, index: number) => void

  toggleTheme: () => void
}

// --- Utilidades para operar sobre el árbol ---

let nodeCounter = 0

function generateNodeId(): string {
  nodeCounter++
  return `node-${Date.now()}-${nodeCounter}`
}

function findNode(tree: TreeNode[], id: string): TreeNode | null {
  for (const node of tree) {
    if (node.id === id) return node
    const found = findNode(node.children, id)
    if (found) return found
  }
  return null
}

function removeFromTree(tree: TreeNode[], id: string): TreeNode[] {
  return tree
    .filter((node) => node.id !== id)
    .map((node) => ({
      ...node,
      children: removeFromTree(node.children, id),
    }))
}

function insertIntoParent(tree: TreeNode[], parentId: string, newNode: TreeNode): TreeNode[] {
  return tree.map((node) => {
    if (node.id === parentId) {
      return { ...node, children: [...node.children, newNode] }
    }
    return { ...node, children: insertIntoParent(node.children, parentId, newNode) }
  })
}

function updateInTree(tree: TreeNode[], id: string, updater: (node: TreeNode) => TreeNode): TreeNode[] {
  return tree.map((node) => {
    if (node.id === id) return updater(node)
    return { ...node, children: updateInTree(node.children, id, updater) }
  })
}

function moveSibling(siblings: TreeNode[], id: string, direction: number): TreeNode[] {
  const index = siblings.findIndex((n) => n.id === id)
  if (index === -1) return siblings
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= siblings.length) return siblings
  const copy = [...siblings]
    ;[copy[index], copy[newIndex]] = [copy[newIndex], copy[index]]
  return copy
}

function moveInTree(tree: TreeNode[], id: string, direction: number): TreeNode[] {
  if (tree.some((n) => n.id === id)) {
    return moveSibling(tree, id, direction)
  }
  return tree.map((node) => ({
    ...node,
    children: moveInTree(node.children, id, direction),
  }))
}



function insertNodeAt(tree: TreeNode[], parentId: string | null, index: number, node: TreeNode): TreeNode[] {
  if (parentId === null) {
    const copy = [...tree]
    copy.splice(index, 0, node)
    return copy
  }
  return tree.map((n) => {
    if (n.id === parentId) {
      const copy = [...n.children]
      copy.splice(index, 0, node)
      return { ...n, children: copy }
    }
    return { ...n, children: insertNodeAt(n.children, parentId, index, node) }
  })
}

function removeAndGetNode(tree: TreeNode[], id: string): { newTree: TreeNode[], node: TreeNode | null } {
  let foundNode: TreeNode | null = null
  const newTree = tree
    .filter((n) => {
      if (n.id === id) {
        foundNode = n
        return false
      }
      return true
    })
    .map((n) => {
      const { newTree: children, node } = removeAndGetNode(n.children, id)
      if (node) foundNode = node
      return { ...n, children }
    })
  return { newTree, node: foundNode }
}

function createNode(componentType: string, landingName: string): TreeNode {
  const definition = getComponentDefinition(componentType)
  const defaultProps: Record<string, any> = {}

  if (definition) {
    definition.propsSchema.forEach((prop) => {
      defaultProps[prop.name] = prop.default
    })
  }

  const id = generateNodeId()

  return {
    id,
    type: componentType,
    identifier: landingName,
    props: defaultProps,
    children: [],
  }
}

// --- Store ---

const useLandingStore = create<LandingState>((set, get) => ({
  landingName: 'mi-landing',
  generationMode: 'landing' as GenerationMode,
  tree: [],
  selectedNodeId: null,
  theme: 'dark',

  setLandingName: (name) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    set({ landingName: slug || 'mi-landing' })
  },

  setGenerationMode: (mode) => set({ generationMode: mode }),

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  insertNodeAtIndex: (parentId, index, componentType) => {
    const { landingName } = get()
    const newNode = createNode(componentType, landingName)
    set((state) => ({
      tree: insertNodeAt(state.tree, parentId, index, newNode),
      selectedNodeId: newNode.id,
    }))
  },

  moveNodeTo: (nodeId, newParentId, index) => {
    set((state) => {
      const { newTree, node } = removeAndGetNode(state.tree, nodeId)
      if (!node) return state
      return {
        tree: insertNodeAt(newTree, newParentId, index, node),
      }
    })
  },

  addNode: (parentId, componentType) => {
    const { landingName } = get()
    const newNode = createNode(componentType, landingName)
    // Add the __title property to the new node's props
    newNode.props.__title = ''

    if (parentId === null) {
      set((state) => ({
        tree: [...state.tree, newNode],
        selectedNodeId: newNode.id,
      }))
    } else {
      set((state) => ({
        tree: insertIntoParent(state.tree, parentId, newNode),
        selectedNodeId: newNode.id,
      }))
    }
  },

  removeNode: (nodeId) => {
    set((state) => ({
      tree: removeFromTree(state.tree, nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    }))
  },

  moveNode: (nodeId, direction) => {
    set((state) => ({
      tree: moveInTree(state.tree, nodeId, direction),
    }))
  },

  updateNodeProps: (nodeId, newProps) => {
    const updater = (node: TreeNode): TreeNode => ({
      ...node,
      props: { ...node.props, ...newProps },
    })
    set((state) => ({
      tree: updateInTree(state.tree, nodeId, updater),
    }))
  },

  updateNodeIdentifier: (nodeId, identifier) => {
    const updater = (node: TreeNode): TreeNode => ({ ...node, identifier })
    set((state) => ({
      tree: updateInTree(state.tree, nodeId, updater),
    }))
  },

  updateNodeTitle: (nodeId, title) => {
    const updater = (node: TreeNode): TreeNode => ({
      ...node,
      title, // Actualiza el campo title a nivel de nodo
    })
    set((state) => ({
      tree: updateInTree(state.tree, nodeId, updater),
    }))
  },


  getSelectedNode: () => {
    const { selectedNodeId, tree } = get()
    if (!selectedNodeId) return null
    return findNode(tree, selectedNodeId)
  },

  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }))
  }
}))

export default useLandingStore
