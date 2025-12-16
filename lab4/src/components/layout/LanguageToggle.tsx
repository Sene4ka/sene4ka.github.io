import React from 'react'
import { useI18n } from '../../context/I18nContext'

export default function LanguageToggle() {
    const { lang, toggle } = useI18n()

    return (
        <button
            onClick={toggle}
            className="bg-card text-theme theme-border px-3 py-3 rounded-full font-semibold text-xs flex items-center
            justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        >
            {lang.toUpperCase()}
        </button>
    )
}