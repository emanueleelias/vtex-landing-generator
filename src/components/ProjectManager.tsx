/**
 * Gestor de proyectos guardados.
 * Permite guardar, cargar, renombrar y eliminar snapshots de landings/bloques.
 */
import { useState } from 'react'
import useProjectStore from '../store/projectStore'
import type { SavedProject } from '../store/projectStore'
import {
    Save,
    FolderOpen,
    Trash2,
    Pencil,
    Check,
    X,
    FilePlus2,
    Clock,
    LayoutList,
    Package,
} from 'lucide-react'

interface ProjectManagerProps {
    isOpen: boolean
    onClose: () => void
}

export default function ProjectManager({ isOpen, onClose }: ProjectManagerProps) {
    const projects = useProjectStore((s) => s.projects)
    const saveProject = useProjectStore((s) => s.saveProject)
    const loadProject = useProjectStore((s) => s.loadProject)
    const deleteProject = useProjectStore((s) => s.deleteProject)
    const renameProject = useProjectStore((s) => s.renameProject)
    const newProject = useProjectStore((s) => s.newProject)

    const [editingId, setEditingId] = useState<string | null>(null)
    const [editName, setEditName] = useState('')
    const [saveName, setSaveName] = useState('')
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

    if (!isOpen) return null

    const handleSave = () => {
        saveProject(saveName || undefined)
        setSaveName('')
    }

    const handleLoad = (id: string) => {
        loadProject(id)
        onClose()
    }

    const handleStartRename = (project: SavedProject) => {
        setEditingId(project.id)
        setEditName(project.name)
    }

    const handleConfirmRename = () => {
        if (editingId && editName.trim()) {
            renameProject(editingId, editName.trim())
        }
        setEditingId(null)
        setEditName('')
    }

    const handleNewProject = () => {
        newProject()
        onClose()
    }

    const formatDate = (iso: string) => {
        const d = new Date(iso)
        return d.toLocaleDateString('es-CL', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const countNodes = (tree: any[]): number => {
        return tree.reduce((acc, n) => acc + 1 + countNodes(n.children || []) + countNodes(n.blocks || []), 0)
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
                <div
                    className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-md">
                                <FolderOpen size={16} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-800 dark:text-white">Proyectos Guardados</h2>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">{projects.length} proyecto{projects.length !== 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Guardar actual */}
                    <div className="px-5 py-3 border-b border-black/5 dark:border-white/10 bg-pink-500/5 dark:bg-pink-500/10">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={saveName}
                                onChange={(e) => setSaveName(e.target.value)}
                                placeholder="Nombre del proyecto (opcional)"
                                className="flex-1 bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all backdrop-blur-sm shadow-inner"
                            />
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <Save size={14} />
                                Guardar
                            </button>
                        </div>
                    </div>

                    {/* Lista de proyectos */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {/* Botón nuevo proyecto */}
                        <button
                            onClick={handleNewProject}
                            className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-black/15 dark:border-white/15 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all group"
                        >
                            <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 group-hover:bg-pink-500/10 flex items-center justify-center transition-colors">
                                <FilePlus2 size={16} className="text-slate-400 group-hover:text-pink-500 transition-colors" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">Nuevo proyecto</p>
                                <p className="text-[10px] text-slate-400">Limpiar canvas y empezar de cero</p>
                            </div>
                        </button>

                        {projects.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                <FolderOpen size={36} className="mb-2 opacity-30" />
                                <p className="text-sm">No hay proyectos guardados</p>
                                <p className="text-[10px] mt-1">Guardá tu trabajo actual usando el botón de arriba</p>
                            </div>
                        )}

                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center gap-3 p-3 rounded-xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-black/20 hover:border-black/15 dark:hover:border-white/15 hover:bg-white/80 dark:hover:bg-black/30 transition-all group backdrop-blur-sm"
                            >
                                {/* Ícono modo */}
                                <div className="w-9 h-9 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                                    {project.generationMode === 'landing' ? (
                                        <LayoutList size={16} className="text-pink-500" />
                                    ) : (
                                        <Package size={16} className="text-amber-500" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    {editingId === project.id ? (
                                        <div className="flex items-center gap-1.5">
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleConfirmRename()}
                                                autoFocus
                                                className="flex-1 bg-white/80 dark:bg-black/30 border border-pink-500/50 rounded px-2 py-1 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-pink-500/30"
                                            />
                                            <button onClick={handleConfirmRename} className="p-1 text-green-500 hover:bg-green-500/10 rounded">
                                                <Check size={14} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-black/10 dark:hover:bg-white/10 rounded">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{project.name}</p>
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                <span className="flex items-center gap-0.5">
                                                    <Clock size={9} /> {formatDate(project.savedAt)}
                                                </span>
                                                <span>•</span>
                                                <span>{countNodes(project.tree)} nodos</span>
                                                <span>•</span>
                                                <span className={project.generationMode === 'landing' ? 'text-pink-400' : 'text-amber-400'}>
                                                    {project.generationMode}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Acciones */}
                                {editingId !== project.id && (
                                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                        <button
                                            onClick={() => handleLoad(project.id)}
                                            className="p-1.5 rounded-lg text-pink-500 hover:bg-pink-500/10 transition-colors"
                                            title="Cargar proyecto"
                                        >
                                            <FolderOpen size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleStartRename(project)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                                            title="Renombrar"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        {confirmDeleteId === project.id ? (
                                            <div className="flex items-center gap-0.5">
                                                <button
                                                    onClick={() => {
                                                        deleteProject(project.id)
                                                        setConfirmDeleteId(null)
                                                    }}
                                                    className="p-1.5 rounded-lg text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                                                    title="Confirmar eliminación"
                                                >
                                                    <Check size={14} />
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDeleteId(null)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                                                    title="Cancelar"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setConfirmDeleteId(project.id)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 border-t border-black/5 dark:border-white/10 text-center">
                        <p className="text-[10px] text-slate-400">
                            Los proyectos se guardan en el almacenamiento local del navegador
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
