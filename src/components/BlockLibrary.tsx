/**
 * Panel izquierdo: lista de componentes VTEX disponibles agrupados por categoría.
 * Reemplaza al antiguo BlockLibrary que mostraba bloques pre-armados.
 */
import useLandingStore from '../store/landingStore'
import { getComponentsByCategory } from '../engine/vtexComponents'
import type { VtexComponentDefinition } from '../engine/types'
import {
    Rows3,
    Columns3,
    Monitor,
    Smartphone,
    Box,
    Type,
    ImageIcon,
    Plus,
    Link2,
} from 'lucide-react'
import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const iconMap: Record<string, React.ElementType> = {
    Rows3,
    Columns3,
    Monitor,
    Smartphone,
    Box,
    Type,
    ImageIcon,
    Link2,
}

const categoryLabels: Record<string, string> = {
    layout: '📐 Layout',
    content: '📝 Contenido',
    media: '🖼️ Media',
    utility: '🔗 Utilidades',
}

function DraggableComponent({ definition, onAdd }: { definition: VtexComponentDefinition, onAdd: () => void }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `new-${definition.type}`,
        data: {
            type: 'new-component',
            componentType: definition.type,
        },
    })

    const IconComponent = iconMap[definition.icon] || Box

    return (
        <button
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onClick={onAdd}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl bg-black/5 dark:bg-black/20 backdrop-blur-sm
        hover:bg-black/10 dark:hover:bg-white/5 border border-black/5 dark:border-white/5 hover:border-pink-500/30 dark:hover:border-pink-500/30
        transition-all shadow-sm group cursor-grab active:cursor-grabbing text-left
        ${isDragging ? 'opacity-50 ring-2 ring-pink-500' : ''}`}
        >
            <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-black/30 group-hover:bg-pink-500/10 border border-black/5 dark:border-white/5
        flex items-center justify-center flex-shrink-0 transition-colors"
            >
                <IconComponent
                    size={18}
                    className="text-slate-500 dark:text-slate-400 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors"
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {definition.label}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-600 font-mono truncate">
                    {definition.type}
                </p>
            </div>
            <Plus
                size={14}
                className="text-slate-400 dark:text-slate-600 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors flex-shrink-0"
            />
        </button>
    )
}

export default function BlockLibrary() {
    const addNode = useLandingStore((s) => s.addNode)
    const selectedNodeId = useLandingStore((s) => s.selectedNodeId)
    const getSelectedNode = useLandingStore((s) => s.getSelectedNode)

    const grouped = getComponentsByCategory()

    const handleAdd = (definition: VtexComponentDefinition) => {
        const selectedNode = getSelectedNode()

        if (selectedNode) {
            const selectedDef = getComponentsByCategory()
            const allComponents = Object.values(selectedDef).flat()
            const parentDef = allComponents.find((c) => c.type === selectedNode.type)

            if (parentDef?.acceptsChildren) {
                addNode(selectedNode.id, definition.type)
                return
            }
        }

        addNode(null, definition.type)
    }

    return (
        <div className="flex flex-col h-full relative z-10">
            <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider drop-shadow-sm">
                    Componentes
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Click o arrastrar al canvas
                </p>
                {selectedNodeId && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        ➤ Clic insertará dentro del nodo
                    </p>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {Object.entries(grouped).map(([category, components]) => (
                    <div key={category}>
                        <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-500 uppercase tracking-wider mb-2 px-1">
                            {categoryLabels[category] || category}
                        </h3>
                        <div className="space-y-1.5">
                            {components.map((definition) => (
                                <DraggableComponent
                                    key={definition.type}
                                    definition={definition}
                                    onAdd={() => handleAdd(definition)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
