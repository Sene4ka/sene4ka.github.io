import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/globals.css'
import { I18nProvider } from './context/I18nContext'
import { UnitsProvider } from './context/UnitsContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <I18nProvider>
            <UnitsProvider>
                <App />
            </UnitsProvider>
        </I18nProvider>
    </React.StrictMode>,
)
