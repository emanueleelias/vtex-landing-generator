/**
 * Tarjeta visual de un nodo en el árbol del canvas.
 * Muestra tipo, identifier, acciones y children anidados.
 */
import { useDraggable } from '@dnd-kit/core'
import DropZone from './DropZone'
import React, { useState } from 'react'
import useLandingStore from '../store/landingStore'
import { getComponentDefinition } from '../engine/vtexComponents'
import type { TreeNode } from '../engine/types'
import {
    ChevronUp,
    ChevronDown,
    Trash2,
    GripVertical,
    ChevronRight,
    ChevronDown as ChevronExpand,
    Link2,
} from 'lucide-react'

interface NodeCardProps {
    node: TreeNode
    index: number
    total: number
    depth?: number
}

export default function NodeCard({ node, index, total }: NodeCardProps) {
    const selectedNodeId = useLandingStore((s) => s.selectedNodeId)
    const selectNode = useLandingStore((s) => s.selectNode)
    const removeNode = useLandingStore((s) => s.removeNode)
    const moveNode = useLandingStore((s) => s.moveNode)

    const [collapsed, setCollapsed] = useState(false)

    const definition = getComponentDefinition(node.type)
    const isSelected = selectedNodeId === node.id
    const hasChildren = node.children.length > 0
    const acceptsChildren = definition?.acceptsChildren ?? false

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `node-${node.id}`,
        data: { type: 'existing-node', node },
    })

    // Colores por categoría adaptados a Glassmorphism dual
    const categoryColors: Record<string, { border: string; bg: string; badge: string }> = {
        layout: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', badge: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30' },
        content: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', badge: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30' },
        media: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', badge: 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30' },
        utility: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', badge: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30' },
    }

    const category = definition?.category || 'layout'
    const colors = categoryColors[category] || categoryColors.layout

    return (
        <div>
            <div
                className={`flex items-center gap-2 p-2.5 rounded-xl border backdrop-blur-md shadow-sm transition-all cursor-pointer
          ${isSelected
                        ? `${colors.bg} ${colors.border} ring-1 ring-${colors.border.split('-')[1]}-500/50 shadow-lg`
                        : 'bg-black/5 dark:bg-black/20 border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-black/40'
                    }
          ${isDragging ? 'opacity-40 border-dashed border-pink-500' : ''}`}
                onClick={() => selectNode(node.id)}
            >
                {/* Grip */}
                <div
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    className="flex-shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-grab active:cursor-grabbing p-1 -m-1"
                >
                    <GripVertical size={14} />
                </div>

                {/* Toggle expand/collapse */}
                {hasChildren ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setCollapsed(!collapsed)
                        }}
                        className="flex-shrink-0 p-0.5 rounded text-slate-400 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                    >
                        {collapsed ? <ChevronRight size={14} /> : <ChevronExpand size={14} />}
                    </button>
                ) : (
                    <div className="w-[18px] flex-shrink-0" />
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate flex items-center gap-1.5">
                            {node.type === '__block-reference' ? (
                                <>
                                    <Link2 size={14} className="text-cyan-500 flex-shrink-0" />
                                    <span className="text-cyan-700 dark:text-cyan-300">REF</span>
                                </>
                            ) : (
                                <>
                                    {definition?.label || node.type}
                                    {node.title && (
                                        <span className="text-xs font-normal text-slate-500 italic opacity-80 truncate max-w-[120px]">
                                            "{node.title}"
                                        </span>
                                    )}
                                </>
                            )}
                        </p>
                        {acceptsChildren && (
                            <span className={`inline-flex items-center text-[9px] font-semibold px-1.5 py-px rounded-full ${colors.badge}`}>
                                {node.children.length}
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono truncate">
                        {node.type === '__block-reference'
                            ? (node.props.__targetKey || 'Sin bloque asignado')
                            : `#${node.identifier}`
                        }
                    </p>
                </div>

                <div className="flex items-center gap-0.5 flex-shrink-0">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            moveNode(node.id, -1)
                        }}
                        disabled={index === 0}
                        className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10
                disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        title="Mover arriba"
                    >
                        <ChevronUp size={13} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            moveNode(node.id, 1)
                        }}
                        disabled={index === total - 1}
                        className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10
                disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                        title="Mover abajo"
                    >
                        <ChevronDown size={13} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            removeNode(node.id)
                        }}
                        className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Eliminar"
                    >
                        <Trash2 size={13} />
                    </button>
                </div>
            </div>

            {/* Render children recursivo con DropZones */}
            {!collapsed && acceptsChildren && (
                <div className="mt-1 flex flex-col border-l-2 border-black/10 dark:border-white/10 ml-4 pb-1">
                    {hasChildren ? (
                        <>
                            {node.children.map((child, i) => (
                                <React.Fragment key={child.id}>
                                    <DropZone id={`${node.id}-above-${child.id}`} parentId={node.id} index={i} />
                                    <NodeCard
                                        node={child}
                                        index={i}
                                        total={node.children.length}
                                    />
                                </React.Fragment>
                            ))}
                            <DropZone id={`${node.id}-end`} parentId={node.id} index={node.children.length} />
                        </>
                    ) : (
                        <DropZone
                            id={`${node.id}-inside-empty`}
                            parentId={node.id}
                            index={0}
                            className="mx-2 my-1 h-8 rounded-lg border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center text-[10px] text-slate-600 dark:text-slate-400 bg-black/5 dark:bg-black/10"
                            text="Soltá componentes aquí"
                        />
                    )}
                </div>
            )}
        </div>
    )
}
