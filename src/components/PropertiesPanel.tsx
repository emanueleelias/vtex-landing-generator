import useLandingStore, { Block, BlockProps } from '../store/landingStore'
import { getBlockDefinition } from '../engine/blocks'
import { Settings, Box } from 'lucide-react'

export default function PropertiesPanel() {
    const selectedBlockId = useLandingStore((s) => s.selectedBlockId)
    const desktopBlocks = useLandingStore((s) => s.desktopBlocks)
    const mobileBlocks = useLandingStore((s) => s.mobileBlocks)
    const updateBlockProps = useLandingStore((s) => s.updateBlockProps)
    const toggleContainer = useLandingStore((s) => s.toggleContainer)
    const setContainerTitle = useLandingStore((s) => s.setContainerTitle)

    const block =
        desktopBlocks.find((b) => b.id === selectedBlockId) ||
        mobileBlocks.find((b) => b.id === selectedBlockId)

    if (!block) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 px-6">
                <Settings size={40} className="mb-3 opacity-20" />
                <p className="text-sm font-medium text-center">Sin bloque seleccionado</p>
                <p className="text-xs mt-1 text-center">
                    Seleccioná un bloque del canvas para editar sus propiedades
                </p>
            </div>
        )
    }

    const definition = getBlockDefinition(block.type)

    const handlePropChange = (key: keyof BlockProps, value: string) => {
        updateBlockProps(block.id, { [key]: value })
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-800">
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Propiedades
                </h2>
                <p className="text-xs text-pink-400 mt-0.5 font-medium">
                    {definition?.label || block.type}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Custom Container */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Box size={12} />
                            Custom Container
                        </label>
                    </div>

                    <div
                        className={`p-3 rounded-xl border transition-all ${block.useContainer
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : 'bg-slate-800/50 border-slate-700/50'
                            }`}
                    >
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={block.useContainer}
                                    onChange={() => toggleContainer(block.id)}
                                    className="sr-only peer"
                                />
                                <div
                                    className="w-10 h-5 bg-slate-700 peer-checked:bg-emerald-500 rounded-full
                              transition-colors"
                                />
                                <div
                                    className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
                              shadow-sm transition-transform peer-checked:translate-x-5"
                                />
                            </div>
                            <span className="text-sm text-slate-300">
                                {block.useContainer ? 'Activado' : 'Desactivado'}
                            </span>
                        </label>

                        {block.useContainer && (
                            <div className="mt-3">
                                <label className="text-xs text-slate-500 mb-1 block">
                                    Título del contenedor
                                </label>
                                <input
                                    type="text"
                                    value={block.containerTitle}
                                    onChange={(e) =>
                                        setContainerTitle(block.id, e.target.value)
                                    }
                                    placeholder={`ON/OFF ${(definition?.label || block.type).toUpperCase()}`}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm
                             text-white placeholder-slate-600 focus:border-emerald-500
                             focus:ring-1 focus:ring-emerald-500/30 transition-all"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-800" />

                {/* Propiedades del bloque */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Settings size={12} />
                        Contenido
                    </label>

                    {renderPropsFields(block, handlePropChange)}
                </div>
            </div>
        </div>
    )
}

/**
 * Renderiza los campos de edición según el tipo de bloque.
 */
function renderPropsFields(
    block: Block,
    handlePropChange: (key: keyof BlockProps, value: string) => void
) {
    const fields = []

    if (block.props.title !== undefined) {
        fields.push(
            <FieldInput
                key="title"
                label="Título"
                value={block.props.title}
                onChange={(v) => handlePropChange('title', v)}
            />
        )
    }

    if (block.props.subtitle !== undefined) {
        fields.push(
            <FieldInput
                key="subtitle"
                label="Subtítulo"
                value={block.props.subtitle}
                onChange={(v) => handlePropChange('subtitle', v)}
            />
        )
    }

    if (block.props.text !== undefined) {
        fields.push(
            <FieldTextArea
                key="text"
                label="Texto (soporta Markdown)"
                value={block.props.text}
                onChange={(v) => handlePropChange('text', v)}
            />
        )
    }

    if (block.props.img1 !== undefined) {
        fields.push(
            <FieldInput
                key="img1"
                label="Imagen 1 (URL)"
                value={block.props.img1}
                onChange={(v) => handlePropChange('img1', v)}
                placeholder="Dejar vacío para placeholder"
            />
        )
    }

    if (block.props.img2 !== undefined) {
        fields.push(
            <FieldInput
                key="img2"
                label="Imagen 2 (URL)"
                value={block.props.img2}
                onChange={(v) => handlePropChange('img2', v)}
                placeholder="Dejar vacío para placeholder"
            />
        )
    }

    if (block.props.link !== undefined) {
        fields.push(
            <FieldInput
                key="link"
                label="Enlace (URL)"
                value={block.props.link}
                onChange={(v) => handlePropChange('link', v)}
                placeholder="/ruta-del-enlace"
            />
        )
    }

    return fields.length > 0 ? fields : (
        <p className="text-xs text-slate-600 italic">
            Este bloque no tiene propiedades editables.
        </p>
    )
}

function FieldInput({ label, value, onChange, placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
    return (
        <div>
            <label className="text-xs text-slate-500 mb-1 block">{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm
                   text-white placeholder-slate-600 focus:border-pink-500
                   focus:ring-1 focus:ring-pink-500/30 transition-all"
            />
        </div>
    )
}

function FieldTextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <label className="text-xs text-slate-500 mb-1 block">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm
                   text-white placeholder-slate-600 focus:border-pink-500
                   focus:ring-1 focus:ring-pink-500/30 transition-all resize-y"
            />
        </div>
    )
}
