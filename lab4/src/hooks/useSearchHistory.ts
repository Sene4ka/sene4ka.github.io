import { useLocalStorage } from './useLocalStorage';
import { City } from '../types';

export function useSearchHistory() {
    const [history, setHistory] = useLocalStorage<City[]>('weather-history', []);

    const addToHistory = (city: City) => {
        setHistory(prev => {
            const filtered = prev.filter(c => c.name !== city.name || c.country !== city.country);
            return [city, ...filtered].slice(0, 5);
        });
    };

    const clearHistory = () => setHistory([]);

    return { history, addToHistory, clearHistory };
}