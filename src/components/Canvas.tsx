/**
 * Canvas central: renderiza el árbol de nodos con tabs Desktop/Mobile.
 */
import useLandingStore, { TabKey } from '../store/landingStore'
import NodeCard from './BlockCard'
import { TABS } from '../utils/constants'
import { Monitor, Smartphone, LayoutList } from 'lucide-react'

export default function Canvas() {
    const selectedTab = useLandingStore((s) => s.selectedTab)
    const setTab = useLandingStore((s) => s.setTab)
    const desktopTree = useLandingStore((s) => s.desktopTree)
    const mobileTree = useLandingStore((s) => s.mobileTree)
    const selectNode = useLandingStore((s) => s.selectNode)

    const tree = selectedTab === TABS.DESKTOP ? desktopTree : mobileTree

    /** Cuenta total de nodos (recursivo) */
    function countNodes(nodes: typeof tree): number {
        return nodes.reduce((acc, n) => acc + 1 + countNodes(n.children), 0)
    }

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex items-center gap-1 px-4 pt-3 pb-0">
                <button
                    onClick={() => setTab(TABS.DESKTOP as TabKey)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all
            ${selectedTab === TABS.DESKTOP
                            ? 'bg-slate-800 text-white border-t border-l border-r border-slate-700'
                            : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                        }`}
                >
                    <Monitor size={16} />
                    Escritorio
                    <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${selectedTab === TABS.DESKTOP
                                ? 'bg-pink-500/20 text-pink-400'
                                : 'bg-slate-700 text-slate-500'
                            }`}
                    >
                        {countNodes(desktopTree)}
                    </span>
                </button>

                <button
                    onClick={() => setTab(TABS.MOBILE as TabKey)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-all
            ${selectedTab === TABS.MOBILE
                            ? 'bg-slate-800 text-white border-t border-l border-r border-slate-700'
                            : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                        }`}
                >
                    <Smartphone size={16} />
                    Celular
                    <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${selectedTab === TABS.MOBILE
                                ? 'bg-pink-500/20 text-pink-400'
                                : 'bg-slate-700 text-slate-500'
                            }`}
                    >
                        {countNodes(mobileTree)}
                    </span>
                </button>
            </div>

            {/* Contenido */}
            <div
                className="flex-1 bg-slate-800 mx-4 mb-4 rounded-b-xl rounded-tr-xl border border-slate-700 overflow-y-auto"
                onClick={(e) => {
                    // Click en vacío deselecciona
                    if (e.target === e.currentTarget) selectNode(null)
                }}
            >
                {tree.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <LayoutList size={48} className="mb-3 opacity-30" />
                        <p className="text-sm font-medium">Sin componentes</p>
                        <p className="text-xs mt-1">
                            Seleccioná un componente del panel izquierdo para agregar
                        </p>
                    </div>
                ) : (
                    <div className="p-4 space-y-1.5">
                        {tree.map((node, index) => (
                            <NodeCard
                                key={node.id}
                                node={node}
                                index={index}
                                total={tree.length}
                                depth={0}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
