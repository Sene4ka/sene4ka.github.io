import { useLocalStorage } from './useLocalStorage';
import { en } from '../i18n/en';
import { ru } from '../i18n/ru';
import { Lang } from "../types";

const translations = {
    en,
    ru,
} as const;

export type TranslationKey = keyof typeof en;

export default function useI18n() {
    const [lang, setLang] = useLocalStorage<Lang>('lang', 'en');

    const t = (key: TranslationKey): string => {
        const value = translations[lang][key];
        return value ?? key;
    };

    const toggle = () => {
        setLang(prev => prev === 'en' ? 'ru' : 'en');
    };

    return { lang, setLang, toggle, t };
}