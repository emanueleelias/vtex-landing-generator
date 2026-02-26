/**
 * Genera la estructura JSONC completa de una landing VTEX IO
 * a partir de árboles de nodos compositivos.
 */
import type { TreeNode } from './types'

/**
 * Construye la clave VTEX del nodo: "tipo#identifier"
 */
function nodeKey(node: TreeNode): string {
  return `${node.type}#${node.identifier}`
}

/**
 * Filtra las props que mantienen su valor por defecto o son internas
 * para generar un JSON limpio.
 */
function cleanProps(props: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {}
  for (const [key, value] of Object.entries(props)) {
    // Omitir props internas (prefijo __)
    if (key.startsWith('__')) continue
    // Omitir valores vacíos o defaults comunes
    if (value === '' || value === false || value === 0) continue
    clean[key] = value
  }
  return clean
}

/**
 * Recorre recursivamente el árbol de nodos y genera los bloques VTEX.
 * Cada nodo produce una entrada en el objeto de salida.
 */
function processTree(nodes: TreeNode[], output: Record<string, any>): void {
  for (const node of nodes) {
    const key = nodeKey(node)
    const entry: Record<string, any> = {}

    // Children
    if (node.children.length > 0) {
      // custom-container usa "children" como array de keys
      entry.children = node.children.map((child) => nodeKey(child))
    }

    // Title (para custom-container)
    if (node.type === 'custom-container' && node.props.__title) {
      entry.title = node.props.__title
    }

    // Props
    const cleaned = cleanProps(node.props)
    if (Object.keys(cleaned).length > 0) {
      entry.props = cleaned
    }

    output[key] = entry

    // Recursión
    processTree(node.children, output)
  }
}

/**
 * Genera el JSONC completo a partir del estado de la landing.
 */
export function generateLandingJSON(state: {
  landingName: string
  desktopTree: TreeNode[]
  mobileTree: TreeNode[]
}): Record<string, any> {
  const { landingName, desktopTree, mobileTree } = state
  const output: Record<string, any> = {}

  // --- Nodo raíz ---
  output[`store.custom#${landingName}`] = {
    blocks: [
      `responsive-layout.desktop#${landingName}`,
      `responsive-layout.mobile#${landingName}`,
    ],
  }

  // --- DESKTOP ---
  const desktopColKey = `flex-layout.col#${landingName}-desktop`
  const desktopRowKey = `flex-layout.row#${landingName}-desktop`

  output[`responsive-layout.desktop#${landingName}`] = {
    children: [desktopRowKey],
  }

  output[desktopRowKey] = {
    children: [desktopColKey],
    props: {
      blockClass: `${landingName}-desktop`,
      fullWidth: true,
    },
  }

  // Recopilar children keys del desktop
  const desktopChildKeys = desktopTree.map((node) => nodeKey(node))
  output[desktopColKey] = {
    children: desktopChildKeys,
    props: {
      blockClass: `${landingName}-desktop`,
    },
  }

  // Procesar nodos desktop
  processTree(desktopTree, output)

  // --- MOBILE ---
  const mobileColKey = `flex-layout.col#${landingName}-mobile`
  const mobileRowKey = `flex-layout.row#${landingName}-mobile`

  output[`responsive-layout.mobile#${landingName}`] = {
    children: [mobileRowKey],
  }

  output[mobileRowKey] = {
    children: [mobileColKey],
    props: {
      blockClass: `${landingName}-mobile`,
      fullWidth: true,
    },
  }

  // Recopilar children keys del mobile
  const mobileChildKeys = mobileTree.map((node) => nodeKey(node))
  output[mobileColKey] = {
    children: mobileChildKeys,
    props: {
      blockClass: `${landingName}-mobile`,
    },
  }

  // Procesar nodos mobile
  processTree(mobileTree, output)

  return output
}

/**
 * Serializa el JSON a formato JSONC con comentarios descriptivos.
 */
export function serializeToJSONC(jsonObj: Record<string, any>, landingName: string): string {
  const rawJson = JSON.stringify(jsonObj, null, 2)

  let result = rawJson

  // Comentario al inicio del responsive-layout.desktop
  result = result.replace(
    `"responsive-layout.desktop#${landingName}"`,
    `// DESKTOP\n  "responsive-layout.desktop#${landingName}"`
  )

  // Comentario al inicio del responsive-layout.mobile
  result = result.replace(
    `"responsive-layout.mobile#${landingName}"`,
    `// MOBILE\n  "responsive-layout.mobile#${landingName}"`
  )

  return result
}
