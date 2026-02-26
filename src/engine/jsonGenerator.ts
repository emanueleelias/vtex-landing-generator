/**
 * Genera la estructura JSONC completa de una landing VTEX IO
 * a partir del árbol único de nodos.
 */
import type { TreeNode } from './types'
import { getComponentDefinition } from './vtexComponents'

/**
 * Construye la clave VTEX del nodo: "tipo#identifier"
 */
function nodeKey(node: TreeNode): string {
  return `${node.type}#${node.identifier}`
}

/**
 * Filtra las props internas, valores vacíos y los valores por defecto 
 * para generar un JSON limpio.
 */
function cleanProps(props: Record<string, any>, nodeType: string): Record<string, any> {
  const definition = getComponentDefinition(nodeType)
  const clean: Record<string, any> = {}

  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('__')) continue

    // Filtros genéricos para valores vacíos (strings vacíos únicamente)
    if (value === '') continue

    // Excepción: la imagen siempre debe renderizar su src por defecto
    if (nodeType === 'image' && key === 'src') {
      clean[key] = value
      continue
    }

    // Filtrar si el valor es idéntico a su default
    if (definition) {
      const propDef = definition.propsSchema.find((p) => p.name === key)
      if (propDef && propDef.default === value) continue
    }

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

    const cleaned = cleanProps(node.props, node.type)
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
 * Incluye el wrapper store.custom#nombre como nodo raíz.
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
 * Genera solo los bloques planos sin el wrapper store.custom.
 * Útil para pegar en un .jsonc ya existente.
 */
export function generateBlockJSON(state: {
  tree: TreeNode[]
}): Record<string, any> {
  const { tree } = state
  const output: Record<string, any> = {}

  // Procesar el árbol sin agregar store.custom
  processTree(tree, output)

  return output
}

/**
 * Serializa el JSON a formato JSONC con comentarios descriptivos.
 * Si stripWrapper es true, elimina las llaves externas { } para pegar dentro de un .jsonc existente.
 */
export function serializeToJSONC(jsonObj: Record<string, any>, _landingName: string, stripWrapper = false): string {
  const raw = JSON.stringify(jsonObj, null, 2)
  if (!stripWrapper) return raw

  // Quitar primera línea "{" y última línea "}"
  const lines = raw.split('\n')
  return lines.slice(1, -1).join('\n')
}
