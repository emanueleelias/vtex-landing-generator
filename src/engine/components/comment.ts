import type { VtexComponentDefinition } from '../types'

export const comment: VtexComponentDefinition = {
  type: 'comment',
  label: 'Comentario (JSONC)',
  icon: 'MessageSquareMore',
  category: 'utility',
  acceptsChildren: false,
  propsSchema: [
    { name: 'text', type: 'string', label: 'Contenido del comentario', default: 'Comentario' },
  ],
}
