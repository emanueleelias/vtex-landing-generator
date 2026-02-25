/**
 * Genera la estructura JSONC completa de una landing VTEX IO.
 */
import { getBlockDefinition } from './blockDefinitions'

/**
 * Envuelve un bloque en un custom-container si useContainer está activo.
 */
function wrapWithContainer(rootKey, containerSuffix, containerTitle, nodes) {
  const containerKey = `custom-container#${containerSuffix}`
  nodes[containerKey] = {
    children: [rootKey],
    title: containerTitle || `ON/OFF ${containerSuffix.toUpperCase()}`,
    props: {
      active: true,
    },
  }
  return containerKey
}

/**
 * Procesa un bloque del estado y genera sus nodos JSONC.
 * @returns {object} { childKey: string, nodes: object }
 */
function processBlock(block, landingName, index, layout) {
  const definition = getBlockDefinition(block.type)
  if (!definition) return null

  let result

  if (definition.shared && definition.generateNodes) {
    // Bloques compartidos (ej: títulos)
    result = definition.generateNodes(block.id, landingName, block.props, index)
  } else if (layout === 'desktop' && definition.generateDesktopNodes) {
    result = definition.generateDesktopNodes(block.id, landingName, block.props, index)
  } else if (layout === 'mobile' && definition.generateMobileNodes) {
    result = definition.generateMobileNodes(block.id, landingName, block.props, index)
  }

  if (!result) return null

  let childKey = result.rootKey

  // Envolver en custom-container si está activo
  if (block.useContainer) {
    const containerSuffix = result.rootKey.split('#')[1] || `${landingName}-block-${index}`
    childKey = wrapWithContainer(
      result.rootKey,
      containerSuffix,
      block.containerTitle,
      result.nodes
    )
  }

  return {
    childKey,
    nodes: result.nodes,
  }
}

/**
 * Genera el JSONC completo a partir del estado de la landing.
 */
export function generateLandingJSON(state) {
  const { landingName, desktopBlocks, mobileBlocks } = state
  const output = {}

  // --- Nodo raíz ---
  output[`store.custom#${landingName}`] = {
    blocks: [
      `responsive-layout.desktop#${landingName}`,
      `responsive-layout.mobile#${landingName}`,
    ],
  }

  // --- DESKTOP ---
  const desktopChildren = []
  const desktopNodes = {}

  desktopBlocks.forEach((block, index) => {
    const result = processBlock(block, landingName, index, 'desktop')
    if (result) {
      desktopChildren.push(result.childKey)
      Object.assign(desktopNodes, result.nodes)
    }
  })

  output[`responsive-layout.desktop#${landingName}`] = {
    children: [`flex-layout.row#${landingName}-desktop`],
  }

  output[`flex-layout.row#${landingName}-desktop`] = {
    children: [`flex-layout.col#${landingName}-desktop`],
    props: {
      blockClass: `${landingName}-desktop`,
      fullWidth: true,
    },
  }

  output[`flex-layout.col#${landingName}-desktop`] = {
    children: desktopChildren,
    props: {
      blockClass: `${landingName}-desktop`,
    },
  }

  // --- MOBILE ---
  const mobileChildren = []
  const mobileNodes = {}

  mobileBlocks.forEach((block, index) => {
    const result = processBlock(block, landingName, index, 'mobile')
    if (result) {
      mobileChildren.push(result.childKey)
      Object.assign(mobileNodes, result.nodes)
    }
  })

  output[`responsive-layout.mobile#${landingName}`] = {
    children: [`flex-layout.row#${landingName}-mobile`],
  }

  output[`flex-layout.row#${landingName}-mobile`] = {
    children: [`flex-layout.col#${landingName}-mobile`],
    props: {
      blockClass: `${landingName}-mobile`,
      fullWidth: true,
    },
  }

  output[`flex-layout.col#${landingName}-mobile`] = {
    children: mobileChildren,
    props: {
      blockClass: `${landingName}-mobile`,
    },
  }

  // Agregar todos los nodos de bloque al output
  Object.assign(output, desktopNodes, mobileNodes)

  return output
}

/**
 * Serializa el JSON a formato JSONC con comentarios descriptivos.
 */
export function serializeToJSONC(jsonObj, landingName) {
  const rawJson = JSON.stringify(jsonObj, null, 2)

  // Agregar comentarios sección por sección
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
