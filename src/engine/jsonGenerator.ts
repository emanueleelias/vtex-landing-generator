/**
 * Genera la estructura JSONC completa de una landing VTEX IO
 * a partir del árbol único de nodos.
 */
import type { TreeNode } from './types'

/**
 * Construye la clave VTEX del nodo: "tipo#identifier"
 */
function nodeKey(node: TreeNode): string {
  return `${node.type}#${node.identifier}`
}

/**
 * Filtra las props internas y valores vacíos/default para generar un JSON limpio.
 */
function cleanProps(props: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {}
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('__')) continue
    if (value === '' || value === false || value === 0) continue
    clean[key] = value
  }
  return clean
}

/**
 * Recorre recursivamente el árbol y genera los bloques VTEX.
 */
function processTree(nodes: TreeNode[], output: Record<string, any>): void {
  for (const node of nodes) {
    const key = nodeKey(node)
    const entry: Record<string, any> = {}

    if (node.children.length > 0) {
      entry.children = node.children.map((child) => nodeKey(child))
    }

    // Global Title
    if (node.title) {
      entry.title = node.title
    }

    const cleaned = cleanProps(node.props)
    if (Object.keys(cleaned).length > 0) {
      entry.props = cleaned
    }

    output[key] = entry

    // Recursión a children
    processTree(node.children, output)
  }
}

/**
 * Genera el JSONC completo a partir del estado de la landing.
 */
export function generateLandingJSON(state: {
  landingName: string
  tree: TreeNode[]
}): Record<string, any> {
  const { landingName, tree } = state
  const output: Record<string, any> = {}

  // Nodo raíz: store.custom con los nodos de nivel superior como blocks
  output[`store.custom#${landingName}`] = {
    blocks: tree.map((node) => nodeKey(node)),
  }

  // Procesar todo el árbol
  processTree(tree, output)

  return output
}

/**
 * Serializa el JSON a formato JSONC con comentarios descriptivos.
 */
export function serializeToJSONC(jsonObj: Record<string, any>, _landingName: string): string {
  return JSON.stringify(jsonObj, null, 2)
}
