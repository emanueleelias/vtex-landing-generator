import React, { useState } from 'react'
import useLandingStore from '../store/landingStore'
import blockDefinitions, { BlockDefinition } from '../engine/blocks'
import BlockPreview from './BlockPreview'
import {
    Type,
    Columns,
    Image,
    FileImage,
    ImageIcon,
    PanelTop,
    Plus,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
    Type,
    Columns,
    Image,
    FileImage,
    ImageIcon,
    PanelTop,
}

export default function BlockLibrary() {
    const addBlock = useLandingStore((s) => s.addBlock)
    const selectedTab = useLandingStore((s) => s.selectedTab)
    const [hoverState, setHoverState] = useState<{ type: string; top: number; right: number } | null>(null)

    const handleAdd = (definition: BlockDefinition) => {
        addBlock(definition.type, { ...definition.defaultProps })
    }

    const handleMouseEnter = (e: React.MouseEvent, type: string) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setHoverState({
            type,
            top: rect.top + rect.height / 2,
            right: rect.right
        })
    }



    return (
        <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-slate-800">
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Bloques
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                    Click para agregar a{' '}
                    <span className="text-pink-400 font-medium">
                        {selectedTab === 'desktop' ? 'Escritorio' : 'Celular'}
                    </span>
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {blockDefinitions.map((definition) => {
                    const IconComponent = iconMap[definition.icon] || ImageIcon

                    return (
                        <div key={definition.type}>
                            <button
                                onClick={() => handleAdd(definition)}
                                onMouseEnter={(e) => handleMouseEnter(e, definition.type)}
                                onMouseLeave={() => setHoverState(null)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/50
                             hover:bg-slate-800 border border-slate-700/50 hover:border-pink-500/30
                             transition-all group cursor-pointer text-left"
                            >
                                <div
                                    className="w-10 h-10 rounded-lg bg-slate-700/50 group-hover:bg-pink-500/10
                                flex items-center justify-center flex-shrink-0 transition-colors"
                                >
                                    <IconComponent
                                        size={20}
                                        className="text-slate-400 group-hover:text-pink-400 transition-colors"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                                        {definition.label}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate">
                                        {definition.description}
                                    </p>
                                </div>
                                <Plus
                                    size={16}
                                    className="text-slate-600 group-hover:text-pink-400 transition-colors flex-shrink-0"
                                />
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* Tooltip renderizado fuera del flujo de scroll usando fixed */}
            {hoverState && (
                <div
                    className="fixed z-50 ml-3 pointer-events-none
                    bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-xl shadow-black/40
                    animate-in fade-in slide-in-from-left-2 duration-200"
                    style={{
                        top: hoverState.top,
                        left: hoverState.right,
                        transform: 'translateY(-50%)'
                    }}
                >
                    {/* Flecha */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5
                        w-3 h-3 bg-slate-900 border-l border-b border-slate-700 rotate-45" />
                    <BlockPreview
                        type={hoverState.type}
                        isMobile={selectedTab === 'mobile'}
                    />
                </div>
            )}
        </div>
    )
}
