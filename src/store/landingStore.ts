import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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
  insertNodeAtIndex: (parentId: string | null, index: number, componentType: string, targetType?: 'children' | 'blocks') => void
  moveNodeTo: (nodeId: string, newParentId: string | null, index: number, targetType?: 'children' | 'blocks') => void

  toggleTheme: () => void
  getAllBlockKeys: () => string[]
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
    const foundChild = findNode(node.children, id)
    if (foundChild) return foundChild
    if (node.blocks) {
      const foundBlock = findNode(node.blocks, id)
      if (foundBlock) return foundBlock
    }
  }
  return null
}

function removeFromTree(tree: TreeNode[], id: string): TreeNode[] {
  return tree
    .filter((node) => node.id !== id)
    .map((node) => {
      const newNode = {
        ...node,
        children: removeFromTree(node.children, id),
      }
      if (node.blocks) {
        newNode.blocks = removeFromTree(node.blocks, id)
      }
      return newNode
    })
}

function insertIntoParent(tree: TreeNode[], parentId: string, newNode: TreeNode, targetType: 'children' | 'blocks' = 'children'): TreeNode[] {
  return tree.map((node) => {
    if (node.id === parentId) {
      if (targetType === 'blocks') {
        return { ...node, blocks: [...(node.blocks || []), newNode] }
      }
      return { ...node, children: [...node.children, newNode] }
    }
    const updatedNode = { ...node, children: insertIntoParent(node.children, parentId, newNode, targetType) }
    if (node.blocks) {
      updatedNode.blocks = insertIntoParent(node.blocks, parentId, newNode, targetType)
    }
    return updatedNode
  })
}

function updateInTree(tree: TreeNode[], id: string, updater: (node: TreeNode) => TreeNode): TreeNode[] {
  return tree.map((node) => {
    if (node.id === id) return updater(node)
    const updatedNode = { ...node, children: updateInTree(node.children, id, updater) }
    if (node.blocks) {
      updatedNode.blocks = updateInTree(node.blocks, id, updater)
    }
    return updatedNode
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
  return tree.map((node) => {
    const updatedNode = {
      ...node,
      children: moveInTree(node.children, id, direction),
    }
    if (node.blocks) {
      updatedNode.blocks = moveInTree(node.blocks, id, direction)
    }
    return updatedNode
  })
}



function insertNodeAt(tree: TreeNode[], parentId: string | null, index: number, node: TreeNode, targetType: 'children' | 'blocks' = 'children'): TreeNode[] {
  if (parentId === null) {
    const copy = [...tree]
    copy.splice(index, 0, node)
    return copy
  }
  return tree.map((n) => {
    if (n.id === parentId) {
      if (targetType === 'blocks') {
        const copy = [...(n.blocks || [])]
        copy.splice(index, 0, node)
        return { ...n, blocks: copy }
      }
      const copy = [...n.children]
      copy.splice(index, 0, node)
      return { ...n, children: copy }
    }
    const updatedNode = { ...n, children: insertNodeAt(n.children, parentId, index, node, targetType) }
    if (n.blocks) {
      updatedNode.blocks = insertNodeAt(n.blocks, parentId, index, node, targetType)
    }
    return updatedNode
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
      const { newTree: children, node: childNode } = removeAndGetNode(n.children, id)
      if (childNode) foundNode = childNode

      const updatedNode = { ...n, children }

      if (n.blocks) {
        const { newTree: blocks, node: blockNode } = removeAndGetNode(n.blocks, id)
        if (blockNode) foundNode = blockNode
        updatedNode.blocks = blocks
      }

      return updatedNode
    })
  return { newTree, node: foundNode }
}

function createNode(componentType: string, landingName: string): TreeNode {
  const id = generateNodeId()
  const definition = getComponentDefinition(componentType)

  const node: TreeNode = {
    id,
    type: componentType,
    identifier: landingName,
    props: {},
    children: [],
  }

  if (definition?.childrenTemplate) {
    node.children = definition.childrenTemplate.map((childDef) => {
      const childNode = createNode(childDef.type, landingName)
      if (childDef.props) {
        childNode.props = { ...childNode.props, ...childDef.props }
      }
      return childNode
    })
  }

  return node
}

/**
 * Sincroniza los hijos del tab-layout al cambiar __tabCount o __useItemChildren.
 */
function syncTabLayoutChildren(
  tree: TreeNode[],
  tabLayoutId: string,
  newProps: Record<string, any>,
  landingName: string
): TreeNode[] {
  const tabLayout = findNode(tree, tabLayoutId)
  if (!tabLayout) return tree

  const tabList = tabLayout.children.find((c) => c.type === 'tab-list')
  const tabContent = tabLayout.children.find((c) => c.type === 'tab-content')
  if (!tabList || !tabContent) return tree

  const currentCount = tabList.children.length
  const newCount = newProps.__tabCount !== undefined ? Number(newProps.__tabCount) : currentCount

  const currentUseChildren = tabLayout.props.__useItemChildren ?? false
  const newUseChildren = newProps.__useItemChildren !== undefined ? newProps.__useItemChildren : currentUseChildren

  const listItemType = newUseChildren ? 'tab-list.item.children' : 'tab-list.item'

  let updatedTree = tree

  // --- Sincronizar cantidad de tabs ---
  if (newCount > currentCount) {
    // Agregar items nuevos
    for (let i = currentCount + 1; i <= newCount; i++) {
      const tabId = `tab${i}`
      const listItem = createNode(listItemType, landingName)
      listItem.props = {
        ...listItem.props,
        tabId,
        ...(listItemType === 'tab-list.item' ? { label: `Tab ${i}` } : {}),
      }

      const contentItem = createNode('tab-content.item', landingName)
      contentItem.props = { ...contentItem.props, tabId }

      updatedTree = updateInTree(updatedTree, tabList.id, (n) => ({
        ...n,
        children: [...n.children, listItem],
      }))
      updatedTree = updateInTree(updatedTree, tabContent.id, (n) => ({
        ...n,
        children: [...n.children, contentItem],
      }))
    }
  } else if (newCount < currentCount) {
    // Eliminar los últimos items
    updatedTree = updateInTree(updatedTree, tabList.id, (n) => ({
      ...n,
      children: n.children.slice(0, newCount),
    }))
    updatedTree = updateInTree(updatedTree, tabContent.id, (n) => ({
      ...n,
      children: n.children.slice(0, newCount),
    }))
  }

  // --- Sincronizar tipo de item (tab-list.item vs tab-list.item.children) ---
  if (newProps.__useItemChildren !== undefined && newUseChildren !== currentUseChildren) {
    updatedTree = updateInTree(updatedTree, tabList.id, (n) => ({
      ...n,
      children: n.children.map((child, idx) => {
        const preservedProps: Record<string, any> = {}
        if (child.props.tabId) preservedProps.tabId = child.props.tabId
        if (child.props.defaultActiveTab) preservedProps.defaultActiveTab = child.props.defaultActiveTab
        if (child.props.blockClass) preservedProps.blockClass = child.props.blockClass
        if (child.props.__title) preservedProps.__title = child.props.__title

        if (newUseChildren) {
          // Cambiar a tab-list.item.children
          return {
            ...child,
            type: 'tab-list.item.children',
            props: preservedProps,
            children: child.children || [],
          }
        } else {
          // Cambiar a tab-list.item
          return {
            ...child,
            type: 'tab-list.item',
            props: { ...preservedProps, label: `Tab ${idx + 1}` },
            children: [],
          }
        }
      }),
    }))
  }

  return updatedTree
}

// --- Store ---

const useLandingStore = create<LandingState>()(
  persist(
    (set, get) => ({
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

      insertNodeAtIndex: (parentId, index, componentType, targetType = 'children') => {
        const { landingName } = get()
        const newNode = createNode(componentType, landingName)
        set((state) => ({
          tree: insertNodeAt(state.tree, parentId, index, newNode, targetType),
          selectedNodeId: newNode.id,
        }))
      },

      moveNodeTo: (nodeId, newParentId, index, targetType = 'children') => {
        set((state) => {
          const { newTree, node } = removeAndGetNode(state.tree, nodeId)
          if (!node) return state
          return {
            tree: insertNodeAt(newTree, newParentId, index, node, targetType),
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
        // Lógica reactiva para tab-layout: sincronizar hijos al cambiar __tabCount o __useItemChildren
        if ('__tabCount' in newProps || '__useItemChildren' in newProps) {
          const node = findNode(get().tree, nodeId)
          if (node && node.type === 'tab-layout') {
            const { landingName } = get()
            const updatedTree = syncTabLayoutChildren(get().tree, nodeId, newProps, landingName)
            const updater = (n: TreeNode): TreeNode => ({
              ...n,
              props: { ...n.props, ...newProps },
            })
            set({ tree: updateInTree(updatedTree, nodeId, updater) })
            return
          }
        }

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
      },

      getAllBlockKeys: () => {
        const { tree } = get()
        const keys: string[] = []
        function collect(nodes: TreeNode[]) {
          for (const node of nodes) {
            if (node.type !== '__block-reference') {
              keys.push(`${node.type}#${node.identifier}`)
            }
            collect(node.children)
            if (node.blocks) {
              collect(node.blocks)
            }
          }
        }
        collect(tree)
        return keys
      },
    }),
    {
      name: 'vtex-landing-generator-current',
      partialize: (state) => ({
        landingName: state.landingName,
        generationMode: state.generationMode,
        tree: state.tree,
        theme: state.theme,
      }),
    }
  )
)

export default useLandingStore
