/**
 * Canvas central: renderiza el árbol único de nodos.
 */
import useLandingStore from '../store/landingStore'
import NodeCard from './BlockCard'
import DropZone from './DropZone'
import { LayoutList } from 'lucide-react'
import React from 'react'

export default function Canvas() {
    const tree = useLandingStore((s) => s.tree)
    const selectNode = useLandingStore((s) => s.selectNode)

    /** Cuenta total de nodos (recursivo) */
    function countNodes(nodes: typeof tree): number {
        return nodes.reduce((acc, n) => acc + 1 + countNodes(n.children), 0)
    }

    return (
        <div className="flex flex-col h-full bg-white/40 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden backdrop-blur-md shadow-inner relative z-0">
            {/* Header unificado */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <LayoutList size={18} className="text-teal-500" />
                    Estructura
                    <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                        {countNodes(tree)}
                    </span>
                </div>
            </div>

            {/* Contenido */}
            <div
                className="flex-1 overflow-y-auto relative"
                onClick={(e) => {
                    if (e.target === e.currentTarget) selectNode(null)
                }}
            >
                {tree.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 relative">
                        <DropZone
                            id="root-empty"
                            parentId={null}
                            index={0}
                            className="absolute inset-4 rounded-xl border-2 border-dashed border-slate-400/50 dark:border-slate-600/50 flex items-center justify-center text-sm font-medium z-10 bg-black/5 dark:bg-slate-800/10 text-slate-600 dark:text-slate-400"
                            text="Soltá un componente aquí"
                        />
                        <LayoutList size={48} className="mb-6 opacity-20 text-slate-800 dark:text-white" />
                        <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2">Sin componentes</p>
                        <p className="text-xs text-center px-12 relative z-20 pointer-events-none text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                            Seleccioná o arrastrá un componente del panel izquierdo para comenzar.<br />
                            Usá <span className="text-teal-600 dark:text-teal-400/80 font-medium">Responsive Desktop</span> y <span className="text-teal-600 dark:text-teal-400/80 font-medium">Responsive Mobile</span> para separar las vistas.
                        </p>
                    </div>
                ) : (
                    <div className="p-4 flex flex-col min-h-full">
                        {tree.map((node, index) => (
                            <React.Fragment key={node.id}>
                                <DropZone id={`root-above-${node.id}`} parentId={null} index={index} />
                                <NodeCard
                                    node={node}
                                    index={index}
                                    total={tree.length}
                                    depth={0}
                                />
                            </React.Fragment>
                        ))}
                        <DropZone id="root-end" parentId={null} index={tree.length} className="flex-1 mt-2 min-h-[100px]" />
                    </div>
                )}
            </div>
        </div>
    )
}
