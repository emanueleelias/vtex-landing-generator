import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TreeNode } from '../engine/types'
import type { GenerationMode } from './landingStore'
import useLandingStore from './landingStore'

export interface SavedProject {
    id: string
    name: string
    generationMode: GenerationMode
    tree: TreeNode[]
    savedAt: string // ISO string
}

interface ProjectState {
    projects: SavedProject[]
    saveProject: (name?: string) => void
    loadProject: (id: string) => void
    deleteProject: (id: string) => void
    renameProject: (id: string, name: string) => void
    newProject: () => void
}

const useProjectStore = create<ProjectState>()(
    persist(
        (set, get) => ({
            projects: [],

            saveProject: (name?: string) => {
                const landing = useLandingStore.getState()
                const projectName = name || landing.landingName || 'sin-nombre'

                // Buscar si ya existe un proyecto con el mismo nombre para actualizarlo
                const existing = get().projects.find((p) => p.name === projectName)

                const project: SavedProject = {
                    id: existing?.id || `proj-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                    name: projectName,
                    generationMode: landing.generationMode,
                    tree: landing.tree,
                    savedAt: new Date().toISOString(),
                }

                set((state) => ({
                    projects: existing
                        ? state.projects.map((p) => (p.id === existing.id ? project : p))
                        : [project, ...state.projects],
                }))
            },

            loadProject: (id: string) => {
                const project = get().projects.find((p) => p.id === id)
                if (!project) return

                const store = useLandingStore.getState()
                store.setLandingName(project.name)
                store.setGenerationMode(project.generationMode)
                // Reemplazar el árbol directamente via setState
                useLandingStore.setState({ tree: project.tree, selectedNodeId: null })
            },

            deleteProject: (id: string) => {
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                }))
            },

            renameProject: (id: string, name: string) => {
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.id === id ? { ...p, name } : p
                    ),
                }))
            },

            newProject: () => {
                useLandingStore.setState({
                    landingName: 'mi-landing',
                    generationMode: 'landing',
                    tree: [],
                    selectedNodeId: null,
                })
            },
        }),
        {
            name: 'vtex-landing-generator-projects',
        }
    )
)

export default useProjectStore
