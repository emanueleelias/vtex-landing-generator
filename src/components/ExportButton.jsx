import React, { useState } from 'react'
import useLandingStore from '../store/landingStore'
import { generateLandingJSON, serializeToJSONC } from '../engine/jsonGenerator'
import { Copy, AlertCircle, Clipboard } from 'lucide-react'

export default function ExportButton() {
    const [status, setStatus] = useState('idle') // idle | copied | error

    const handleExport = async () => {
        const state = useLandingStore.getState()
        const { landingName, desktopBlocks, mobileBlocks } = state

        if (desktopBlocks.length === 0 && mobileBlocks.length === 0) {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 2000)
            return
        }

        try {
            const json = generateLandingJSON(state)
            const content = serializeToJSONC(json, landingName)

            await navigator.clipboard.writeText(content)
            setStatus('copied')
            setTimeout(() => setStatus('idle'), 2500)
        } catch (err) {
            console.error('Error al exportar:', err)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 2500)
        }
    }

    const getButtonContent = () => {
        switch (status) {
            case 'copied':
                return (
                    <>
                        <Copy size={16} />
                        <span>¡Copiado!</span>
                    </>
                )
            case 'error':
                return (
                    <>
                        <AlertCircle size={16} />
                        <span>Agregá bloques primero</span>
                    </>
                )
            default:
                return (
                    <>
                        <Clipboard size={16} />
                        <span>Copiar JSONC</span>
                    </>
                )
        }
    }

    const getButtonClass = () => {
        switch (status) {
            case 'copied':
                return 'bg-emerald-600 hover:bg-emerald-700 border-emerald-500'
            case 'error':
                return 'bg-red-600/80 hover:bg-red-700 border-red-500'
            default:
                return 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 border-pink-500/30'
        }
    }

    return (
        <button
            onClick={handleExport}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white
                  border transition-all shadow-lg ${getButtonClass()}`}
        >
            {getButtonContent()}
        </button>
    )
}
