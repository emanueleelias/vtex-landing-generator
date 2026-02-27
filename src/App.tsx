import BlockLibrary from './components/BlockLibrary'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'
import ExportButton from './components/ExportButton'
import ProjectManager from './components/ProjectManager'
import useLandingStore from './store/landingStore'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  defaultDropAnimationSideEffects,
  pointerWithin
} from '@dnd-kit/core'
import { useState, useEffect } from 'react'
import { getComponentDefinition } from './engine/vtexComponents'
import { Box, Sun, Moon, FolderOpen, Trash2, X } from 'lucide-react'

// Componente simple para el DragOverlay
function DragOverlayCard({ activeData }: { activeData: any }) {
  if (!activeData) return <div className="w-48 h-12 bg-slate-800 rounded-xl border border-pink-500 opacity-80" />

  const isNew = activeData.type === 'new-component'
  const def = isNew
    ? getComponentDefinition(activeData.componentType)
    : getComponentDefinition(activeData.node?.type)

  return (
    <div className="w-64 flex items-center gap-2 p-2.5 rounded-xl border border-pink-500 bg-slate-800 shadow-xl opacity-90 scale-105">
      <div className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center">
        <Box size={18} className="text-pink-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800 dark:text-white">{def?.label || 'Componente'}</p>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Arraste para mover...</p>
      </div>
    </div>
  )
}

export default function App() {
  const landingName = useLandingStore((s) => s.landingName)
  const setLandingName = useLandingStore((s) => s.setLandingName)
  const generationMode = useLandingStore((s) => s.generationMode)
  const setGenerationMode = useLandingStore((s) => s.setGenerationMode)
  const insertNodeAtIndex = useLandingStore((s) => s.insertNodeAtIndex)
  const moveNodeTo = useLandingStore((s) => s.moveNodeTo)
  const theme = useLandingStore((s) => s.theme)
  const toggleTheme = useLandingStore((s) => s.toggleTheme)

  // Sincronizar tema con html class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeData, setActiveData] = useState<any>(null)
  const [projectManagerOpen, setProjectManagerOpen] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  // Tooltip de onboarding: se muestra solo la primera vez
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('vtex-lg-onboarding-dismissed')
  })

  const dismissOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem('vtex-lg-onboarding-dismissed', 'true')
  }

  const handleClearCanvas = () => {
    useLandingStore.setState({ tree: [], selectedNodeId: null, landingName: 'mi-landing' })
    setConfirmClear(false)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    setActiveData(event.active.data.current)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveData(null)

    if (!over) return

    const overData = over.data.current
    if (overData?.type !== 'drop-zone') return

    const { parentId, index, targetType } = overData
    const activeData = active.data.current

    if (activeData?.type === 'new-component') {
      // Insertar nuevo
      insertNodeAtIndex(parentId, index, activeData.componentType, targetType)
    } else if (activeData?.type === 'existing-node') {
      // Mover existente
      const nodeId = activeData.node.id
      // Evitar mover un nodo a sí mismo o a sus hijos (esto lo maneja zustand en parte, 
      // pero para evitar bugs circulares básicos, no soltar en su propio dropzone)
      if (parentId === nodeId) return

      moveNodeTo(nodeId, parentId, index, targetType)
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin} // point intersection is better for thin DropZones
    >
      <div className="mesh-bg">
        <div className="mesh-blob-1" />
        <div className="mesh-blob-2" />
        <div className="mesh-blob-3" />
      </div>

      <div className="flex flex-col h-screen relative z-0 text-slate-800 dark:text-slate-100">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 glass-panel border-b-0 rounded-b-2xl mx-4 mt-2 shadow-sm dark:shadow-2xl z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <h1 className="text-lg font-semibold text-slate-800 dark:text-white tracking-tight drop-shadow-sm">
                Landing Generator
              </h1>
            </div>

            <div className="h-6 w-px bg-black/10 dark:bg-slate-700" />

            {/* Mode Toggle Pills */}
            <div className="flex items-center bg-white/40 dark:bg-black/20 rounded-xl p-0.5 border border-black/5 dark:border-white/10 backdrop-blur-sm shadow-inner">
              <button
                onClick={() => setGenerationMode('landing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${generationMode === 'landing'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
              >
                Landing
              </button>
              <button
                onClick={() => setGenerationMode('block')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${generationMode === 'block'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
              >
                Bloque
              </button>
            </div>

            <div className="h-6 w-px bg-black/10 dark:bg-slate-700" />

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider drop-shadow-sm">
                {generationMode === 'landing' ? 'Nombre:' : 'ID:'}
              </label>
              <input
                type="text"
                value={landingName}
                onChange={(e) => setLandingName(e.target.value)}
                placeholder={generationMode === 'landing' ? 'nombre-de-la-landing' : 'identificador-del-bloque'}
                className="bg-white/40 dark:bg-black/20 border border-black/5 dark:border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-800 dark:text-white
             placeholder-slate-400 dark:placeholder-slate-500 focus:border-pink-500/50 focus:bg-pink-500/5 focus:ring-1 focus:ring-pink-500/30
             transition-all w-64 backdrop-blur-sm shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botón limpiar canvas */}
            {confirmClear ? (
              <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-red-500/10 border border-red-500/30 animate-in">
                <span className="text-[10px] text-red-500 font-medium whitespace-nowrap">¿Limpiar todo?</span>
                <button
                  onClick={handleClearCanvas}
                  className="p-1 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors"
                  title="Confirmar"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  title="Cancelar"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="p-2 rounded-xl bg-white/40 dark:bg-black/20 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors shadow-sm"
                title="Limpiar canvas"
              >
                <Trash2 size={18} />
              </button>
            )}

            {/* Botón proyectos con tooltip onboarding */}
            <div className="relative">
              <button
                onClick={() => {
                  setProjectManagerOpen(true)
                  if (showOnboarding) dismissOnboarding()
                }}
                className="p-2 rounded-xl bg-white/40 dark:bg-black/20 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors shadow-sm"
                title="Proyectos guardados"
              >
                <FolderOpen size={18} />
              </button>

              {/* Tooltip onboarding */}
              {showOnboarding && (
                <div className="absolute top-full right-0 mt-3 w-64 p-3 rounded-xl bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 shadow-2xl z-[100]">
                  <button
                    onClick={dismissOnboarding}
                    className="absolute top-1.5 right-1.5 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X size={12} />
                  </button>
                  <p className="text-xs font-semibold text-pink-500 mb-1">💾 Auto-guardado activo</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    Tu trabajo se guarda automáticamente. Si recargás la página, todo se restaura.
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Usá este botón <strong>📂</strong> para guardar snapshots y alternar entre múltiples proyectos.
                  </p>
                  <div className="h-2 w-2 bg-white dark:bg-slate-800 border-t border-l border-black/10 dark:border-white/10 rotate-45 absolute -top-[5px] right-4" />
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/40 dark:bg-black/20 border border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors shadow-sm"
              title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <ExportButton />
          </div>
        </header>

        {/* Layout principal 3 paneles */}
        <div className="flex flex-1 overflow-hidden mt-4 gap-4 px-4 pb-4">
          {/* Panel izquierdo: Biblioteca de bloques */}
          <aside className="w-64 flex-shrink-0 glass-panel border-b-0 rounded-2xl flex flex-col z-10 shadow-2xl overflow-hidden">
            <BlockLibrary />
          </aside>

          {/* Panel central: Canvas */}
          <main className="flex-1 flex flex-col overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/10 shadow-inner">
            <Canvas />
          </main>

          {/* Panel derecho: Propiedades */}
          <aside className="w-80 flex-shrink-0 glass-panel border-b-0 rounded-2xl flex flex-col z-10 shadow-2xl overflow-hidden">
            <PropertiesPanel />
          </aside>
        </div>

        {/* Footer flotante */}
        <footer className="absolute bottom-2 left-1/2 -translate-x-1/2 py-1.5 px-4 rounded-full text-[10px] text-slate-500 dark:text-slate-400 glass-panel flex items-center gap-2 shadow-lg">
          <span>&copy; {new Date().getFullYear()} Emanuele, Elias Daniel</span>
          <span className="text-slate-400 dark:text-slate-600">•</span>
          <span className="font-mono text-pink-500 dark:text-pink-400/80">v{__APP_VERSION__}</span>
        </footer>
      </div>

      <DragOverlay
        dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.4' } } }) }}
      >
        {activeId ? <DragOverlayCard activeData={activeData} /> : null}
      </DragOverlay>

      <ProjectManager isOpen={projectManagerOpen} onClose={() => setProjectManagerOpen(false)} />
    </DndContext>
  )
}

