import React from 'react'
import { useUnits } from '../../context/UnitsContext'

export default function UnitsToggle() {
    const { units, toggle } = useUnits()

    return (
        <button
            onClick={toggle}
            className="bg-card text-theme theme-border px-4 py-3 rounded-full font-semibold text-xs transition-all
            duration-300 hover:scale-105 active:scale-95"
        >
            {units === 'metric' ? '°C' : '°F'}
        </button>
    )
}
