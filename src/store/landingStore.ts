import { create } from 'zustand'
import type { TreeNode } from '../engine/types'
import { getComponentDefinition } from '../engine/vtexComponents'

interface LandingState {
  landingName: string
  tree: TreeNode[]
  selectedNodeId: string | null

  setLandingName: (name: string) => void
  selectNode: (nodeId: string | null) => void
  addNode: (parentId: string | null, componentType: string) => void
  removeNode: (nodeId: string) => void
  moveNode: (nodeId: string, direction: number) => void
  updateNodeProps: (nodeId: string, props: Record<string, any>) => void
  updateNodeIdentifier: (nodeId: string, identifier: string) => void
  updateNodeTitle: (nodeId: string, title: string) => void
  duplicateNode: (nodeId: string) => void
  getSelectedNode: () => TreeNode | null
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

function deepCloneNode(node: TreeNode): TreeNode {
  return {
    ...node,
    id: generateNodeId(),
    props: { ...node.props },
    children: node.children.map(deepCloneNode),
  }
}

function insertAfterInTree(tree: TreeNode[], afterId: string, newNode: TreeNode): TreeNode[] {
  const index = tree.findIndex((n) => n.id === afterId)
  if (index !== -1) {
    const copy = [...tree]
    copy.splice(index + 1, 0, newNode)
    return copy
  }
  return tree.map((node) => ({
    ...node,
    children: insertAfterInTree(node.children, afterId, newNode),
  }))
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
  const shortId = id.split('-').pop() || '0'

  return {
    id,
    type: componentType,
    identifier: `${landingName}-${componentType.replace(/\./g, '-')}-${shortId}`,
    props: defaultProps,
    children: [],
  }
}

// --- Store ---

const useLandingStore = create<LandingState>((set, get) => ({
  landingName: 'mi-landing',
  tree: [],
  selectedNodeId: null,

  setLandingName: (name) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9-\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    set({ landingName: slug || 'mi-landing' })
  },

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  addNode: (parentId, componentType) => {
    const { landingName } = get()
    const newNode = createNode(componentType, landingName)

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
      props: { ...node.props, __title: title },
    })
    set((state) => ({
      tree: updateInTree(state.tree, nodeId, updater),
    }))
  },

  duplicateNode: (nodeId) => {
    const { tree } = get()
    const original = findNode(tree, nodeId)
    if (!original) return

    const cloned = deepCloneNode(original)
    set((state) => ({
      tree: insertAfterInTree(state.tree, nodeId, cloned),
      selectedNodeId: cloned.id,
    }))
  },

  getSelectedNode: () => {
    const { selectedNodeId, tree } = get()
    if (!selectedNodeId) return null
    return findNode(tree, selectedNodeId)
  },
}))

export default useLandingStore
