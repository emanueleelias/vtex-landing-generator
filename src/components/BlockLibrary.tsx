import React from 'react'
import useLandingStore from '../store/landingStore'
import blockDefinitions, { BlockDefinition } from '../engine/blockDefinitions'
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

    const handleAdd = (definition: BlockDefinition) => {
        addBlock(definition.type, { ...definition.defaultProps })
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
                        <button
                            key={definition.type}
                            onClick={() => handleAdd(definition)}
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
                    )
                })}
            </div>
        </div>
    )
}
