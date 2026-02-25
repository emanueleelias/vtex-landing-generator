import React from 'react'
import useLandingStore from '../store/landingStore'
import { getBlockDefinition } from '../engine/blockDefinitions'
import {
    ChevronUp,
    ChevronDown,
    Trash2,
    Copy,
    Box,
    GripVertical,
} from 'lucide-react'

export default function BlockCard({ block, index, total }) {
    const selectedBlockId = useLandingStore((s) => s.selectedBlockId)
    const selectBlock = useLandingStore((s) => s.selectBlock)
    const removeBlock = useLandingStore((s) => s.removeBlock)
    const moveBlock = useLandingStore((s) => s.moveBlock)
    const duplicateBlock = useLandingStore((s) => s.duplicateBlock)

    const definition = getBlockDefinition(block.type)
    const isSelected = selectedBlockId === block.id

    return (
        <div
            className={`block-enter flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer
        ${isSelected
                    ? 'bg-slate-700/80 border-pink-500/50 shadow-lg shadow-pink-500/5'
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                }`}
            onClick={() => selectBlock(block.id)}
        >
            {/* Grip */}
            <div className="flex-shrink-0 text-slate-600">
                <GripVertical size={16} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-200">
                        {definition?.label || block.type}
                    </p>
                    {block.useContainer && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <Box size={10} />
                            Container
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                    {block.containerTitle || definition?.description || ''}
                </p>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-1 flex-shrink-0">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        moveBlock(block.id, -1)
                    }}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700
                     disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Mover arriba"
                >
                    <ChevronUp size={14} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        moveBlock(block.id, 1)
                    }}
                    disabled={index === total - 1}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700
                     disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Mover abajo"
                >
                    <ChevronDown size={14} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        duplicateBlock(block.id)
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10
                     transition-colors"
                    title="Duplicar"
                >
                    <Copy size={14} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        removeBlock(block.id)
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10
                     transition-colors"
                    title="Eliminar"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    )
}
