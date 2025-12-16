import type { Units, Lang, Theme, TranslationKey } from './core';

export interface AppSettings {
    units: Units;
    lang: Lang;
    theme: Theme;
}

export type Translations = Record<TranslationKey, string>;