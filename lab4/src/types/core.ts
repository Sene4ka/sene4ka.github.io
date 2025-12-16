export type Units = 'metric' | 'imperial';
export type Lang = 'en' | 'ru';
export type Theme = 'light' | 'dark';

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Location extends Coordinates {
    name: string;
    country: string;
    state?: string;
}

export type TranslationKey = keyof typeof import('../i18n/en').en;