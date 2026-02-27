import useLandingStore from '../store/landingStore'
import { getComponentDefinition } from '../engine/vtexComponents'
import type { PropSchema } from '../engine/types'
import { Settings, Hash, Tag, Link2, Plus, X } from 'lucide-react'

export default function PropertiesPanel() {
    const updateNodeProps = useLandingStore((s) => s.updateNodeProps)
    const updateNodeIdentifier = useLandingStore((s) => s.updateNodeIdentifier)
    const updateNodeTitle = useLandingStore((s) => s.updateNodeTitle)
    const getAllBlockKeys = useLandingStore((s) => s.getAllBlockKeys)

    // Subscribimos el componente al resultado de getSelectedNode() para que 
    // re-renderice al modificar props o el identifier.
    const node = useLandingStore((s) => s.getSelectedNode())

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
    const isBlockReference = node.type === '__block-reference'

    const handlePropChange = (propName: string, value: any) => {
        updateNodeProps(node.id, { [propName]: value })
    }

    // Para nodos de referencia, mostrar UI especial
    if (isBlockReference) {
        const blockKeys = getAllBlockKeys()
        const currentTarget = node.props.__targetKey || ''
        return (
            <div className="flex flex-col h-full relative z-10">
                <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
                    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider drop-shadow-sm">
                        Referencia a Bloque
                    </h2>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-0.5 font-medium drop-shadow-sm">
                        Apunta a un bloque existente
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-5">
                    <div className="space-y-3">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 drop-shadow-sm">
                            <Link2 size={12} />
                            Bloque destino
                        </label>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">Ingresar manualmente</label>
                                <input
                                    type="text"
                                    value={currentTarget}
                                    onChange={(e) => handlePropChange('__targetKey', e.target.value)}
                                    placeholder="Ej: product-summary.shelf#main"
                                    className="w-full bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 text-sm
                                        text-slate-900 dark:text-white placeholder-slate-400 focus:border-cyan-500/50 focus:bg-cyan-500/5
                                        focus:ring-1 focus:ring-cyan-500/30 transition-all backdrop-blur-sm shadow-inner font-mono text-xs"
                                />
                            </div>

                            {blockKeys.length > 0 && (
                                <div>
                                    <label className="text-[10px] text-slate-500 font-semibold mb-1 block">O seleccionar del canvas</label>
                                    <select
                                        value={blockKeys.includes(currentTarget) ? currentTarget : ''}
                                        onChange={(e) => handlePropChange('__targetKey', e.target.value)}
                                        className="w-full bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 text-sm
                                            text-slate-900 dark:text-white focus:border-cyan-500/50 focus:bg-cyan-500/5
                                            focus:ring-1 focus:ring-cyan-500/30 transition-all backdrop-blur-sm shadow-inner"
                                    >
                                        <option value="" className="dark:bg-slate-800 dark:text-slate-200">— Seleccioná un bloque —</option>
                                        {blockKeys.map((key) => (
                                            <option key={key} value={key} className="dark:bg-slate-800 dark:text-slate-200">
                                                {key}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    {currentTarget && (
                        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-700 dark:text-cyan-300">
                            <p className="font-semibold mb-1">Vista previa del children:</p>
                            <code className="font-mono text-[11px]">"{currentTarget}"</code>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full relative z-10">
            {/* Header */}
            <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider drop-shadow-sm">
                    Propiedades
                </h2>
                <p className="text-xs text-pink-600 dark:text-pink-400 mt-0.5 font-medium drop-shadow-sm">
                    {definition?.label || node.type}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {node.type}#{node.identifier}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Identifier */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 drop-shadow-sm">
                        <Hash size={12} />
                        Identificador
                    </label>
                    <input
                        type="text"
                        value={node.identifier}
                        onChange={(e) => updateNodeIdentifier(node.id, e.target.value)}
                        className="w-full bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 text-sm
              text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-pink-500/50 focus:bg-pink-500/5
              focus:ring-1 focus:ring-pink-500/30 transition-all font-mono text-xs backdrop-blur-sm shadow-inner"
                    />
                </div>

                <div className="h-px bg-black/10 dark:bg-white/5" />

                {/* Global Title */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 drop-shadow-sm">
                        <Tag size={12} />
                        Título (Site Editor)
                    </label>
                    <input
                        type="text"
                        value={node.title || ''}
                        onChange={(e) => updateNodeTitle(node.id, e.target.value)}
                        placeholder="Nombre a mostrar en Site Editor"
                        className="w-full bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 text-sm
                  text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-emerald-500/50 focus:bg-emerald-500/5
                  focus:ring-1 focus:ring-emerald-500/30 transition-all backdrop-blur-sm shadow-inner"
                    />
                </div>

                {/* Divider */}
                <div className="h-px bg-black/10 dark:bg-white/5" />

                {/* Props del componente */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 drop-shadow-sm">
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
    const baseInputClass = `w-full bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 text-sm
    text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-pink-500/50 focus:bg-pink-500/5
    focus:ring-1 focus:ring-pink-500/30 transition-all backdrop-blur-sm shadow-inner`

    switch (schema.type) {
        case 'string':
            // Si el nombre sugiere un texto largo, usar textarea
            if (schema.name === 'text') {
                return (
                    <div>
                        <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block drop-shadow-sm">{schema.label}</label>
                        <textarea
                            value={value ?? ''}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={`Ej: ${schema.default}`}
                            rows={4}
                            className={`${baseInputClass} resize-y placeholder:italic`}
                        />
                    </div>
                )
            }
            return (
                <div>
                    <label className="text-xs text-slate-500 mb-1 block">{schema.label}</label>
                    <input
                        type="text"
                        value={value ?? ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={`Ej: ${schema.default}`}
                        className={`${baseInputClass} placeholder:italic`}
                    />
                </div>
            )

        case 'enum':
            return (
                <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block drop-shadow-sm">{schema.label}</label>
                    <select
                        value={value ?? ''}
                        onChange={(e) => onChange(e.target.value)}
                        className={`${baseInputClass} cursor-pointer`}
                    >
                        <option value="" disabled className="dark:bg-slate-800 dark:text-slate-400 italic">
                            — Seleccionar ({String(schema.default)}) —
                        </option>
                        {schema.options?.map((opt) => (
                            <option key={opt.value} value={opt.value} className="dark:bg-slate-800 dark:text-slate-200">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )

        case 'boolean':
            return (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/5 backdrop-blur-sm shadow-inner group">
                    <div className="flex flex-col pr-4">
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 drop-shadow-sm">{schema.label}</span>
                            {schema.description && (
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{schema.description}</span>
                            )}
                        </div>
                        {value === undefined && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500/70 italic mt-1">
                                Default: {schema.default ? 'true' : 'false'}
                            </span>
                        )}
                    </div>
                    <label className="relative cursor-pointer">
                        <input
                            type="checkbox"
                            checked={value ?? Boolean(schema.default)}
                            onChange={(e) => onChange(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-black/10 dark:bg-white/10 peer-checked:bg-pink-500/80 border border-black/5 dark:border-white/10 peer-checked:border-pink-400/50 rounded-full transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white dark:bg-slate-200 peer-checked:bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4" />
                    </label>
                </div>
            )

        case 'number':
        case 'stepper': {
            const numValue = value ?? (schema.default as number)
            const min = schema.min ?? 0
            const max = schema.max ?? 99

            if (schema.type === 'stepper') {
                return (
                    <div>
                        <label className="text-xs text-slate-600 dark:text-slate-400 mb-1.5 block drop-shadow-sm">{schema.label}</label>
                        {schema.description && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 leading-tight">{schema.description}</p>
                        )}
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={numValue <= min}
                                onClick={() => onChange(Math.max(min, numValue - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/60 dark:bg-black/20
                                    border border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-300
                                    hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-500
                                    disabled:opacity-30 disabled:cursor-not-allowed
                                    transition-all backdrop-blur-sm shadow-inner text-sm font-bold"
                            >
                                −
                            </button>
                            <div className="flex-1 text-center py-1.5 rounded-lg bg-white/60 dark:bg-black/20
                                border border-black/5 dark:border-white/10 text-sm font-semibold
                                text-slate-900 dark:text-white backdrop-blur-sm shadow-inner tabular-nums">
                                {numValue}
                            </div>
                            <button
                                type="button"
                                disabled={numValue >= max}
                                onClick={() => onChange(Math.min(max, numValue + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/60 dark:bg-black/20
                                    border border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-300
                                    hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-500
                                    disabled:opacity-30 disabled:cursor-not-allowed
                                    transition-all backdrop-blur-sm shadow-inner text-sm font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )
            }

            return (
                <div>
                    <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block drop-shadow-sm">{schema.label}</label>
                    <input
                        type="number"
                        value={value ?? ''}
                        onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                        placeholder={`Ej: ${schema.default}`}
                        className={`${baseInputClass} placeholder:italic`}
                    />
                </div>
            )
        }

        case 'object':
            return (
                <div className="space-y-3 p-3 border border-black/5 dark:border-white/10 rounded-xl bg-white/30 dark:bg-black/10 backdrop-blur-sm shadow-inner">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider drop-shadow-sm block border-b border-black/5 dark:border-white/5 pb-2 mb-3">
                        {schema.label}
                    </label>
                    {schema.objectSchema?.map((subSchema) => (
                        <PropField
                            key={subSchema.name}
                            schema={subSchema}
                            value={value?.[subSchema.name]}
                            onChange={(subVal) => {
                                const newValue = { ...(value || {}), [subSchema.name]: subVal }
                                onChange(newValue)
                            }}
                        />
                    ))}
                </div>
            )

        case 'conditions':
            return (
                <div className="space-y-3 p-3 border border-black/5 dark:border-white/10 rounded-xl bg-white/30 dark:bg-black/10 backdrop-blur-sm shadow-inner">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider drop-shadow-sm block border-b border-black/5 dark:border-white/5 pb-2 mb-3">
                        {schema.label}
                    </label>
                    <ConditionsField schema={schema} value={value} onChange={onChange} />
                </div>
            )

        default:
            return null
    }
}

const SUBJECTS_BY_CONTEXT: Record<string, string[]> = {
    product: [
        'productId', 'categoryId', 'brandId', 'selectedItemId', 'productClusters',
        'categoryTree', 'specificationProperties', 'areAllVariationsSelected',
        'isProductAvailable', 'hasMoreSellersThan', 'hasBestPrice', 'sellerId'
    ],
    binding: ['bindingId'],
    category: ['category', 'department'],
    telemarketing: ['impersonable'],
}

function ConditionsField({
    schema,
    value,
    onChange,
}: {
    schema: PropSchema
    value: any[] | undefined
    onChange: (val: any[] | undefined) => void
}) {
    const conditions = value || []
    const context = schema.conditionsContext || 'product'
    const availableSubjects = SUBJECTS_BY_CONTEXT[context] || SUBJECTS_BY_CONTEXT.product

    const baseInputClass = `w-full bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 text-sm
    text-slate-900 dark:text-white placeholder-slate-400 focus:border-cyan-500/50 focus:bg-cyan-500/5
    focus:ring-1 focus:ring-cyan-500/30 transition-all backdrop-blur-sm shadow-inner text-xs`

    const addCondition = () => {
        const newCondition = { subject: availableSubjects[0], arguments: {}, toBe: true }
        onChange([...conditions, newCondition])
    }

    const removeCondition = (idx: number) => {
        const newConditions = conditions.filter((_, i) => i !== idx)
        onChange(newConditions.length ? newConditions : undefined)
    }

    const updateCondition = (idx: number, updates: any) => {
        const newConditions = [...conditions]
        newConditions[idx] = { ...newConditions[idx], ...updates }
        onChange(newConditions)
    }

    return (
        <div className="space-y-4">
            {conditions.map((cond, idx) => {
                const needsArgs = !['areAllVariationsSelected', 'isProductAvailable'].includes(cond.subject)
                const isArrayArg = ['category', 'department', 'sellerId'].includes(cond.subject)
                const isSpecArg = cond.subject === 'specificationProperties'
                const isQuantityArg = cond.subject === 'hasMoreSellersThan'
                const isBoolArg = cond.subject === 'hasBestPrice' || cond.subject === 'impersonable'

                return (
                    <div key={idx} className="p-3 rounded-lg border border-black/5 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 relative group">
                        <button
                            type="button"
                            onClick={() => removeCondition(idx)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            title="Eliminar Condición"
                        >
                            <X size={14} />
                        </button>

                        <div className="space-y-3">
                            <div className="pr-6">
                                <label className="text-[10px] text-slate-500 font-semibold mb-1 block">Subject</label>
                                <select
                                    value={cond.subject}
                                    onChange={(e) => updateCondition(idx, { subject: e.target.value, arguments: {} })}
                                    className={`${baseInputClass} py-1.5`}
                                >
                                    {availableSubjects.map((sub) => (
                                        <option key={sub} value={sub} className="dark:bg-slate-800 dark:text-slate-200">{sub}</option>
                                    ))}
                                </select>
                            </div>

                            {needsArgs && (
                                <div className="space-y-2 border-l-2 border-cyan-500/30 pl-3 ml-1 mt-2">
                                    <label className="text-[10px] text-slate-500 font-semibold block">Arguments</label>

                                    {isBoolArg ? (
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={cond.arguments?.value ?? true}
                                                onChange={(e) => updateCondition(idx, { arguments: { value: e.target.checked } })}
                                                className="rounded border-black/20 text-cyan-500 focus:ring-cyan-500/30"
                                            />
                                            <span className="text-xs text-slate-700 dark:text-slate-300">Value (True / False)</span>
                                        </label>
                                    ) : isQuantityArg ? (
                                        <input
                                            type="number"
                                            value={cond.arguments?.quantity ?? 0}
                                            onChange={(e) => updateCondition(idx, { arguments: { quantity: Number(e.target.value) } })}
                                            placeholder="Quantity"
                                            className={`${baseInputClass} py-1.5`}
                                        />
                                    ) : isArrayArg ? (
                                        <textarea
                                            value={(cond.arguments?.ids || []).join(', ')}
                                            onChange={(e) => {
                                                const ids = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                                                updateCondition(idx, { arguments: { ids } })
                                            }}
                                            placeholder="IDs separados por coma (ej: 1, 2, 3)"
                                            rows={2}
                                            className={`${baseInputClass} py-1.5`}
                                        />
                                    ) : isSpecArg ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={cond.arguments?.name ?? ''}
                                                onChange={(e) => updateCondition(idx, { arguments: { ...cond.arguments, name: e.target.value } })}
                                                placeholder="Name"
                                                className={`${baseInputClass} py-1.5`}
                                            />
                                            <input
                                                type="text"
                                                value={cond.arguments?.value ?? ''}
                                                onChange={(e) => updateCondition(idx, { arguments: { ...cond.arguments, value: e.target.value } })}
                                                placeholder="Value (Opt)"
                                                className={`${baseInputClass} py-1.5`}
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={cond.arguments?.id ?? ''}
                                            onChange={(e) => updateCondition(idx, { arguments: { id: e.target.value } })}
                                            placeholder="ID"
                                            className={`${baseInputClass} py-1.5`}
                                        />
                                    )}
                                </div>
                            )}

                            <label className="flex items-center gap-2 cursor-pointer mt-2 pt-2 border-t border-black/5 dark:border-white/5">
                                <input
                                    type="checkbox"
                                    checked={cond.toBe ?? true}
                                    onChange={(e) => updateCondition(idx, { toBe: e.target.checked })}
                                    className="rounded border-black/20 text-pink-500 focus:ring-pink-500/30"
                                />
                                <span className="text-[10px] text-slate-700 dark:text-slate-300 uppercase tracking-widest font-semibold">To Be</span>
                            </label>
                        </div>
                    </div>
                )
            })}

            <button
                type="button"
                onClick={addCondition}
                className="w-full py-2 border border-dashed border-cyan-500/50 hover:border-cyan-500 
                rounded-lg text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 
                transition-all flex items-center justify-center gap-2"
            >
                <Plus size={14} />
                Agregar Condición
            </button>
        </div>
    )
}

