import React from 'react'
import useLandingStore from '../store/landingStore'
import BlockCard from './BlockCard'
import { TABS } from '../utils/constants'
import { Monitor, Smartphone, LayoutList } from 'lucide-react'

export default function Canvas() {
    const selectedTab = useLandingStore((s) => s.selectedTab)
    const setTab = useLandingStore((s) => s.setTab)
    const desktopBlocks = useLandingStore((s) => s.desktopBlocks)
    const mobileBlocks = useLandingStore((s) => s.mobileBlocks)

    const blocks = selectedTab === TABS.DESKTOP ? desktopBlocks : mobileBlocks

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex items-center gap-1 px-4 pt-3 pb-0">
                <button
                    onClick={() => setTab(TABS.DESKTOP)}
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
                        {desktopBlocks.length}
                    </span>
                </button>

                <button
                    onClick={() => setTab(TABS.MOBILE)}
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
                        {mobileBlocks.length}
                    </span>
                </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 bg-slate-800 mx-4 mb-4 rounded-b-xl rounded-tr-xl border border-slate-700 overflow-y-auto">
                {blocks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                        <LayoutList size={48} className="mb-3 opacity-30" />
                        <p className="text-sm font-medium">Sin bloques</p>
                        <p className="text-xs mt-1">
                            Seleccioná un bloque del panel izquierdo para agregarlo
                        </p>
                    </div>
                ) : (
                    <div className="p-4 space-y-2">
                        {blocks.map((block, index) => (
                            <BlockCard
                                key={block.id}
                                block={block}
                                index={index}
                                total={blocks.length}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
