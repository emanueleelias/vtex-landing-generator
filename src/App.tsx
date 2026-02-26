import BlockLibrary from './components/BlockLibrary'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'
import ExportButton from './components/ExportButton'
import useLandingStore from './store/landingStore'
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    defaultDropAnimationSideEffects,
    pointerWithin
} from '@dnd-kit/core'
import { useState } from 'react'
import { getComponentDefinition } from './engine/vtexComponents'
import { Box } from 'lucide-react'

// Componente simple para el DragOverlay
function DragOverlayCard({ activeData }: { activeData: any }) {
    if (!activeData) return <div className="w-48 h-12 bg-slate-800 rounded-xl border border-pink-500 opacity-80" />

    const isNew = activeData.type === 'new-component'
    const def = isNew
        ? getComponentDefinition(activeData.componentType)
        : getComponentDefinition(activeData.node?.type)

    return (
        <div className="w-64 flex items-center gap-2 p-2.5 rounded-xl border border-pink-500 bg-slate-800 shadow-xl opacity-90 scale-105">
            <div className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <Box size={18} className="text-pink-400" />
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-white">{def?.label || 'Componente'}</p>
                <p className="text-[10px] text-slate-400 font-mono">Arraste para mover...</p>
            </div>
        </div>
    )
}

export default function App() {
    const landingName = useLandingStore((s) => s.landingName)
    const setLandingName = useLandingStore((s) => s.setLandingName)
    const insertNodeAtIndex = useLandingStore((s) => s.insertNodeAtIndex)
    const moveNodeTo = useLandingStore((s) => s.moveNodeTo)

    const [activeId, setActiveId] = useState<string | null>(null)
    const [activeData, setActiveData] = useState<any>(null)

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
        setActiveData(event.active.data.current)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveId(null)
        setActiveData(null)

        if (!over) return

        const overData = over.data.current
        if (overData?.type !== 'drop-zone') return

        const { parentId, index } = overData
        const activeData = active.data.current

        if (activeData?.type === 'new-component') {
            // Insertar nuevo
            insertNodeAtIndex(parentId, index, activeData.componentType)
        } else if (activeData?.type === 'existing-node') {
            // Mover existente
            const nodeId = activeData.node.id
            // Evitar mover un nodo a sí mismo o a sus hijos (esto lo maneja zustand en parte, 
            // pero para evitar bugs circulares básicos, no soltar en su propio dropzone)
            if (parentId === nodeId) return

            moveNodeTo(nodeId, parentId, index)
        }
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={pointerWithin} // point intersection is better for thin DropZones
        >
            <div className="flex flex-col h-screen bg-slate-950">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">V</span>
                            </div>
                            <h1 className="text-lg font-semibold text-white tracking-tight">
                                Landing Generator
                            </h1>
                        </div>

                        <div className="h-6 w-px bg-slate-700" />

                        <div className="flex items-center gap-2">
                            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                value={landingName}
                                onChange={(e) => setLandingName(e.target.value)}
                                placeholder="nombre-de-la-landing"
                                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white
             placeholder-slate-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30
             transition-all w-64"
                            />
                        </div>
                    </div>

                    <ExportButton />
                </header>

                {/* Layout principal 3 paneles */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Panel izquierdo: Biblioteca de bloques */}
                    <aside className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col z-10">
                        <BlockLibrary />
                    </aside>

                    {/* Panel central: Canvas */}
                    <main className="flex-1 flex flex-col overflow-hidden">
                        <Canvas />
                    </main>

                    {/* Panel derecho: Propiedades */}
                    <aside className="w-80 flex-shrink-0 bg-slate-900 border-l border-slate-800 flex flex-col z-10">
                        <PropertiesPanel />
                    </aside>
                </div>

                {/* Footer */}
                <footer className="py-2 text-center text-xs text-slate-500 bg-slate-900 border-t border-slate-800 flex justify-center items-center gap-2">
                    <span>&copy; {new Date().getFullYear()} Todos los derechos reservados | Emanuele, Elias Daniel</span>
                    <span className="text-slate-700">•</span>
                    <span className="font-mono text-slate-400">v{__APP_VERSION__}</span>
                </footer>
            </div>

            <DragOverlay
                dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }) }}
            >
                {activeId ? <DragOverlayCard activeData={activeData} /> : null}
            </DragOverlay>
        </DndContext>
    )
}

