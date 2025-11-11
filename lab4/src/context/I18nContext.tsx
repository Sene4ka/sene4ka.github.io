import { createContext, ReactNode, useContext } from 'react';
import { Lang, TranslationKey, Translations } from '../types';
import { en } from '../i18n/en';
import { ru } from '../i18n/ru';
import { useLocalStorage } from '../hooks/useLocalStorage';

const translations: Record<Lang, Translations> = { en, ru };

export interface I18nContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    toggle: () => void;
    t: (key: TranslationKey) => string;
}

export const I18nContext = createContext<I18nContextType |
    undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useLocalStorage<Lang>('lang', 'en');

    const toggle = () => setLang(prev => prev === 'en' ? 'ru' : 'en');

    const t = (key: TranslationKey): string => {
        return translations[lang][key] ?? key;
    };

    return (
        <I18nContext.Provider value={{ lang, setLang, toggle, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) throw new Error('useI18n must be used within I18nProvider');
    return context;
};