import React from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useI18n } from '../../context/I18nContext'

export default function ThemeToggle() {
    const [theme, setTheme] = useLocalStorage<'light'|'dark'>('theme', 'light')
    const { t } = useI18n()

    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="grid grid-cols-1 gap-1 w-[120px] py-3 place-items-center">
            <button
                onClick={toggleTheme}
                className="
          relative inline-flex h-6 w-16 items-center rounded-full
          transition-colors duration-300 ease-in-out theme-btn-bg theme-border
          col-start-1 row-start-1
        "
                aria-label={t('app.toggleTheme')}
            >
                <span
                    className={`
            inline-block h-4 w-4 transform rounded-full
            transition-transform duration-300 ease-in-out theme-btn-circle
            ${theme === 'dark' ? 'translate-x-10' : 'translate-x-1'}
          `}
                />
            </button>

            <span className="text-sm font-medium theme-btn-text text-center whitespace-nowrap col-start-1
                  row-start-2 w-full">
                {t(theme === 'dark' ? 'app.dark' : 'app.light')}
            </span>
        </div>
    )
}
