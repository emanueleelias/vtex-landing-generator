/**
 * Panel derecho: propiedades del nodo seleccionado.
 * Genera los campos dinámicamente a partir del propsSchema del componente.
 */
import useLandingStore from '../store/landingStore'
import { getComponentDefinition } from '../engine/vtexComponents'
import type { PropSchema, TreeNode } from '../engine/types'
import { Settings, Hash, Tag } from 'lucide-react'

export default function PropertiesPanel() {
    const selectedNodeId = useLandingStore((s) => s.selectedNodeId)
    const desktopTree = useLandingStore((s) => s.desktopTree)
    const mobileTree = useLandingStore((s) => s.mobileTree)
    const updateNodeProps = useLandingStore((s) => s.updateNodeProps)
    const updateNodeIdentifier = useLandingStore((s) => s.updateNodeIdentifier)
    const updateNodeTitle = useLandingStore((s) => s.updateNodeTitle)
    const getSelectedNode = useLandingStore((s) => s.getSelectedNode)

    const node = getSelectedNode()

    if (!node) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 px-6">
                <Settings size={40} className="mb-3 opacity-20" />
                <p className="text-sm font-medium text-center">Sin nodo seleccionado</p>
                <p className="text-xs mt-1 text-center">
                    Seleccioná un componente del canvas para editar sus propiedades
                </p>
            </div>
        )
    }

    const definition = getComponentDefinition(node.type)

    const handlePropChange = (propName: string, value: any) => {
        updateNodeProps(node.id, { [propName]: value })
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-800">
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                    Propiedades
                </h2>
                <p className="text-xs text-pink-400 mt-0.5 font-medium">
                    {definition?.label || node.type}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {node.type}#{node.identifier}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Identifier */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Hash size={12} />
                        Identificador
                    </label>
                    <input
                        type="text"
                        value={node.identifier}
                        onChange={(e) => updateNodeIdentifier(node.id, e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm
              text-white placeholder-slate-600 focus:border-pink-500
              focus:ring-1 focus:ring-pink-500/30 transition-all font-mono text-xs"
                    />
                </div>

                {/* Title para custom-container */}
                {node.type === 'custom-container' && (
                    <>
                        <div className="h-px bg-slate-800" />
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Tag size={12} />
                                Título del contenedor
                            </label>
                            <input
                                type="text"
                                value={node.props.__title || ''}
                                onChange={(e) => updateNodeTitle(node.id, e.target.value)}
                                placeholder={`ON/OFF ${node.identifier.toUpperCase()}`}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm
                  text-white placeholder-slate-600 focus:border-emerald-500
                  focus:ring-1 focus:ring-emerald-500/30 transition-all"
                            />
                        </div>
                    </>
                )}

                {/* Divider */}
                <div className="h-px bg-slate-800" />

                {/* Props del componente */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Settings size={12} />
                        Props
                    </label>

                    {definition?.propsSchema && definition.propsSchema.length > 0 ? (
                        definition.propsSchema.map((schema) => (
                            <PropField
                                key={schema.name}
                                schema={schema}
                                value={node.props[schema.name]}
                                onChange={(val) => handlePropChange(schema.name, val)}
                            />
                        ))
                    ) : (
                        <p className="text-xs text-slate-600 italic">
                            Este componente no tiene propiedades editables.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

// --- Componente genérico para renderizar un campo según su tipo ---

function PropField({
    schema,
    value,
    onChange,
}: {
    schema: PropSchema
    value: any
    onChange: (val: any) => void
}) {
    const baseInputClass = `w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm
    text-white placeholder-slate-600 focus:border-pink-500
    focus:ring-1 focus:ring-pink-500/30 transition-all`

    switch (schema.type) {
        case 'string':
            // Si el nombre sugiere un texto largo, usar textarea
            if (schema.name === 'text') {
                return (
                    <div>
                        <label className="text-xs text-slate-500 mb-1 block">{schema.label}</label>
                        <textarea
                            value={value ?? schema.default}
                            onChange={(e) => onChange(e.target.value)}
                            rows={4}
                            className={`${baseInputClass} resize-y`}
                        />
                    </div>
                )
            }
            return (
                <div>
                    <label className="text-xs text-slate-500 mb-1 block">{schema.label}</label>
                    <input
                        type="text"
                        value={value ?? schema.default}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={String(schema.default)}
                        className={baseInputClass}
                    />
                </div>
            )

        case 'enum':
            return (
                <div>
                    <label className="text-xs text-slate-500 mb-1 block">{schema.label}</label>
                    <select
                        value={value ?? schema.default}
                        onChange={(e) => onChange(e.target.value)}
                        className={`${baseInputClass} cursor-pointer`}
                    >
                        {schema.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )

        case 'boolean':
            return (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <span className="text-xs text-slate-400">{schema.label}</span>
                    <label className="relative cursor-pointer">
                        <input
                            type="checkbox"
                            checked={value ?? schema.default}
                            onChange={(e) => onChange(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-700 peer-checked:bg-pink-500 rounded-full transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
                    </label>
                </div>
            )

        case 'number':
            return (
                <div>
                    <label className="text-xs text-slate-500 mb-1 block">{schema.label}</label>
                    <input
                        type="number"
                        value={value ?? schema.default}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className={baseInputClass}
                    />
                </div>
            )

        default:
            return null
    }
}
