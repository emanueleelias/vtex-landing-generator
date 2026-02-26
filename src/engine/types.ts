/**
 * Tipos centrales del sistema compositivo de componentes VTEX.
 */

// --- Registro de componentes ---

export interface PropSchema {
  name: string
  type: 'string' | 'enum' | 'boolean' | 'number' | 'object'
  label: string
  default: string | boolean | number | Record<string, any>
  options?: { value: string; label: string }[]
  objectSchema?: PropSchema[]
}

export interface VtexComponentDefinition {
  type: string
  label: string
  icon: string
  category: 'layout' | 'content' | 'media' | 'utility'
  acceptsChildren: boolean
  propsSchema: PropSchema[]
}

// --- Árbol de nodos ---

export interface TreeNode {
  id: string
  type: string
  identifier: string
  title?: string
  props: Record<string, any>
  children: TreeNode[]
}
