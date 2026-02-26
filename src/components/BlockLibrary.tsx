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
} from 'lucide-react'
import React from 'react'

const iconMap: Record<string, React.ElementType> = {
    Rows3,
    Columns3,
    Monitor,
    Smartphone,
    Box,
    Type,
    ImageIcon,
}

const categoryLabels: Record<string, string> = {
    layout: '📐 Layout',
    content: '📝 Contenido',
    media: '🖼️ Media',
}

export default function BlockLibrary() {
    const addNode = useLandingStore((s) => s.addNode)
    const selectedNodeId = useLandingStore((s) => s.selectedNodeId)
    const selectedTab = useLandingStore((s) => s.selectedTab)
    const getSelectedNode = useLandingStore((s) => s.getSelectedNode)

    const grouped = getComponentsByCategory()

    const handleAdd = (definition: VtexComponentDefinition) => {
        const selectedNode = getSelectedNode()

        // Si hay un nodo seleccionado que acepta children, agregar como hijo
        if (selectedNode) {
            const selectedDef = getComponentsByCategory()
            const allComponents = Object.values(selectedDef).flat()
            const parentDef = allComponents.find((c) => c.type === selectedNode.type)

            if (parentDef?.acceptsChildren) {
                addNode(selectedNode.id, definition.type)
                return
            }
        }

        // Si no, agregar como nodo raíz
        addNode(null, definition.type)
    }

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-slate-800">
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Componentes
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                    Click para agregar a{' '}
                    <span className="text-pink-400 font-medium">
                        {selectedTab === 'desktop' ? 'Escritorio' : 'Celular'}
                    </span>
                </p>
                {selectedNodeId && (
                    <p className="text-xs text-emerald-400 mt-1">
                        ➤ Se insertará dentro del nodo seleccionado
                    </p>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {Object.entries(grouped).map(([category, components]) => (
                    <div key={category}>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
                            {categoryLabels[category] || category}
                        </h3>
                        <div className="space-y-1.5">
                            {components.map((definition) => {
                                const IconComponent = iconMap[definition.icon] || Box
                                return (
                                    <button
                                        key={definition.type}
                                        onClick={() => handleAdd(definition)}
                                        className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/50
                      hover:bg-slate-800 border border-slate-700/50 hover:border-pink-500/30
                      transition-all group cursor-pointer text-left"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-slate-700/50 group-hover:bg-pink-500/10
                      flex items-center justify-center flex-shrink-0 transition-colors"
                                        >
                                            <IconComponent
                                                size={18}
                                                className="text-slate-400 group-hover:text-pink-400 transition-colors"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                                                {definition.label}
                                            </p>
                                            <p className="text-[10px] text-slate-600 font-mono truncate">
                                                {definition.type}
                                            </p>
                                        </div>
                                        <Plus
                                            size={14}
                                            className="text-slate-600 group-hover:text-pink-400 transition-colors flex-shrink-0"
                                        />
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
