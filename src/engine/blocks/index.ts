import { BlockDefinition } from './types'
import titlesBlock from './titles'
import twoImgTextBlock from './twoImgText'
import twoImgBlock from './twoImg'
import imgTextBlock from './imgText'
import singleImgBlock from './singleImg'
import bannerBlock from './banner'

// Re-exportar el tipo para que los consumidores no necesiten importar de './types'
export type { BlockDefinition }

/**
 * Array con todas las definiciones de bloques disponibles.
 * Para agregar un nuevo bloque:
 *   1. Crear un archivo en esta carpeta (ej: miBloque.ts)
 *   2. Importarlo e incluirlo en este array
 */
const blockDefinitions: BlockDefinition[] = [
    titlesBlock,
    twoImgTextBlock,
    twoImgBlock,
    imgTextBlock,
    singleImgBlock,
    bannerBlock,
]

export default blockDefinitions

/**
 * Obtener definición de bloque por tipo
 */
export function getBlockDefinition(type: string): BlockDefinition | undefined {
    return blockDefinitions.find((b) => b.type === type)
}
