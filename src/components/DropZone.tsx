import { useDroppable } from '@dnd-kit/core'

interface DropZoneProps {
    id: string
    parentId: string | null
    index: number
    className?: string
    text?: string
    targetType?: 'children' | 'blocks'
}

export default function DropZone({ id, parentId, index, className, text, targetType = 'children' }: DropZoneProps) {
    const { setNodeRef, isOver } = useDroppable({
        id,
        data: { type: 'drop-zone', parentId, index, targetType },
    })

    if (className) {
        // Para dropzones "vacías" de contenedor, que son más grandes
        return (
            <div
                ref={setNodeRef}
                className={`transition-all ${className} ${isOver ? 'bg-pink-500/10 border-pink-500 text-pink-400' : ''
                    }`}
            >
                {text}
            </div>
        )
    }

    // Para dropzones entre hermanos, una línea delgada y ancha
    return (
        <div
            ref={setNodeRef}
            className={`h-2 w-full -my-1 z-10 relative transition-all ${isOver ? 'opacity-100 scale-y-150' : 'opacity-0'
                }`}
        >
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-pink-500 -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
        </div>
    )
}
