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
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 pt-3 pb-0">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-t-lg text-sm font-medium text-white border-t border-l border-r border-slate-700">
                    <LayoutList size={16} />
                    Estructura
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400">
                        {countNodes(tree)}
                    </span>
                </div>
            </div>

            {/* Contenido */}
            <div
                className="flex-1 bg-slate-800 mx-4 mb-4 rounded-b-xl rounded-tr-xl border border-slate-700 overflow-y-auto"
                onClick={(e) => {
                    if (e.target === e.currentTarget) selectNode(null)
                }}
            >
                {tree.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 relative">
                        <DropZone
                            id="root-empty"
                            parentId={null}
                            index={0}
                            className="absolute inset-4 rounded-xl border-2 border-dashed border-slate-700/50 flex items-center justify-center text-sm font-medium z-10 bg-slate-800/20"
                            text="Soltá un componente aquí"
                        />
                        <LayoutList size={48} className="mb-3 opacity-30" />
                        <p className="text-sm font-medium">Sin componentes</p>
                        <p className="text-xs mt-1 text-center px-8 relative z-20 pointer-events-none">
                            Seleccioná o arrastrá un componente del panel izquierdo para comenzar.
                            Usá <span className="text-blue-400 font-medium">Responsive Desktop</span> y <span className="text-blue-400 font-medium">Responsive Mobile</span> para separar las vistas.
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
