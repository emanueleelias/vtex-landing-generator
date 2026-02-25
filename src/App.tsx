import BlockLibrary from './components/BlockLibrary'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'
import ExportButton from './components/ExportButton'
import useLandingStore from './store/landingStore'

export default function App() {
    const landingName = useLandingStore((s) => s.landingName)
    const setLandingName = useLandingStore((s) => s.setLandingName)

    return (
        <div className="flex flex-col h-screen bg-slate-950">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">V</span>
                        </div>
                        <h1 className="text-lg font-semibold text-white tracking-tight">
                            Landing Generator
                        </h1>
                    </div>

                    <div className="h-6 w-px bg-slate-700" />

                    <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            value={landingName}
                            onChange={(e) => setLandingName(e.target.value)}
                            placeholder="nombre-de-la-landing"
                            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white
                         placeholder-slate-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30
                         transition-all w-64"
                        />
                    </div>
                </div>

                <ExportButton />
            </header>

            {/* Layout principal 3 paneles */}
            <div className="flex flex-1 overflow-hidden">
                {/* Panel izquierdo: Biblioteca de bloques */}
                <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
                    <BlockLibrary />
                </aside>

                {/* Panel central: Canvas */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    <Canvas />
                </main>

                {/* Panel derecho: Propiedades */}
                <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">
                    <PropertiesPanel />
                </aside>
            </div>
        </div>
    )
}
