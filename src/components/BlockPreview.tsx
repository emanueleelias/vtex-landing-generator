import { BLOCK_TYPES } from '../utils/constants'

interface BlockPreviewProps {
    type: string
    isMobile: boolean
}

/**
 * Renderiza una miniatura skeleton que simula la vista previa de un bloque
 * dentro de un marco que representa una página web.
 */
export default function BlockPreview({ type, isMobile }: BlockPreviewProps) {
    return (
        <div className="w-48 pointer-events-none select-none">
            {/* Marco de página simulada */}
            <div
                className={`rounded-lg border border-slate-600 bg-slate-850 overflow-hidden ${isMobile ? 'w-28 mx-auto' : 'w-full'
                    }`}
            >
                {/* Header skeleton */}
                <div className="h-3 bg-slate-700/80 border-b border-slate-600/50 flex items-center gap-0.5 px-1">
                    <div className="w-1 h-1 rounded-full bg-slate-500" />
                    <div className="w-1 h-1 rounded-full bg-slate-500" />
                    <div className="w-1 h-1 rounded-full bg-slate-500" />
                </div>

                {/* Contenido del bloque */}
                <div className="p-2 min-h-[60px] flex items-center justify-center">
                    <BlockSkeleton type={type} isMobile={isMobile} />
                </div>

                {/* Footer skeleton */}
                <div className="h-2 bg-slate-700/50 border-t border-slate-600/50" />
            </div>

            {/* Label */}
            <p className="text-[10px] text-slate-400 text-center mt-1.5">
                Vista previa — {isMobile ? 'Celular' : 'Escritorio'}
            </p>
        </div>
    )
}

function BlockSkeleton({ type, isMobile }: { type: string; isMobile: boolean }) {
    switch (type) {
        case BLOCK_TYPES.TITLES:
            return (
                <div className="w-full flex flex-col items-center gap-1.5 py-1">
                    <div className="h-2 w-16 rounded-sm bg-pink-500/30" />
                    <div className="h-1.5 w-12 rounded-sm bg-slate-600" />
                </div>
            )

        case BLOCK_TYPES.TWO_IMG:
            return isMobile ? (
                <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-14 h-10 rounded-sm bg-slate-600 animate-pulse" />
                    <div className="w-14 h-10 rounded-sm bg-slate-500 animate-pulse" />
                </div>
            ) : (
                <div className="w-full flex gap-1.5 justify-center">
                    <div className="w-16 h-12 rounded-sm bg-slate-600 animate-pulse" />
                    <div className="w-16 h-12 rounded-sm bg-slate-500 animate-pulse" />
                </div>
            )

        case BLOCK_TYPES.TWO_IMG_TEXT:
            return isMobile ? (
                <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-14 h-9 rounded-sm bg-slate-600 animate-pulse" />
                    <div className="h-1.5 w-10 rounded-sm bg-slate-500" />
                </div>
            ) : (
                <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="flex gap-1.5 justify-center">
                        <div className="w-14 h-10 rounded-sm bg-slate-600 animate-pulse" />
                        <div className="w-14 h-10 rounded-sm bg-slate-500 animate-pulse" />
                    </div>
                    <div className="h-1.5 w-12 rounded-sm bg-slate-500" />
                </div>
            )

        case BLOCK_TYPES.IMG_TEXT:
            return isMobile ? (
                <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-14 h-10 rounded-sm bg-slate-600 animate-pulse" />
                    <div className="h-1.5 w-10 rounded-sm bg-slate-500" />
                </div>
            ) : (
                <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-20 h-12 rounded-sm bg-slate-600 animate-pulse" />
                    <div className="h-1.5 w-12 rounded-sm bg-slate-500" />
                </div>
            )

        case BLOCK_TYPES.SINGLE_IMG:
            return isMobile ? (
                <div className="w-14 h-12 rounded-sm bg-slate-600 animate-pulse mx-auto" />
            ) : (
                <div className="w-full h-12 rounded-sm bg-slate-600 animate-pulse" />
            )

        case BLOCK_TYPES.BANNER:
            return isMobile ? (
                <div className="w-16 h-6 rounded-sm bg-gradient-to-r from-slate-600 to-slate-500 animate-pulse mx-auto" />
            ) : (
                <div className="w-full h-6 rounded-sm bg-gradient-to-r from-slate-600 to-slate-500 animate-pulse" />
            )

        default:
            return (
                <div className="w-full h-10 rounded-sm bg-slate-700 animate-pulse" />
            )
    }
}
