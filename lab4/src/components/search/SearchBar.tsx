import React, { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { geocode } from '../../api/openWeather';
import SearchSuggestions from './SearchSuggestions';
import { useI18n } from '../../context/I18nContext';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import type { City } from '../../types';

export default function SearchBar({ onSelect }: { onSelect: (city: City) => void }) {
    const [q, setQ] = useState('');
    const debounced = useDebounce(q, 400);
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const { t, lang } = useI18n();
    const { history, addToHistory } = useSearchHistory();
    const [showHistory, setShowHistory] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!q && isFocused) {
            setSuggestions(history);
            setShowHistory(true);
            setLoading(false);
        } else if (!q && !isFocused) {
            setSuggestions([]);
            setShowHistory(false);
        }
    }, [q, history, isFocused]);

    useEffect(() => {
        if (!debounced) return;

        let mounted = true;
        setLoading(true);
        setShowHistory(false);

        geocode(debounced, 5)
            .then(data => {
                if (!mounted) return;
                setSuggestions(data);
            })
            .catch(() => setSuggestions([]))
            .finally(() => mounted && setLoading(false));

        return () => { mounted = false };
    }, [debounced, lang]);

    const handleSelect = (city: City) => {
        onSelect(city);
        addToHistory(city);
        setQ('');
        setSuggestions([]);
        setIsFocused(false);
    };

    return (
        <div className="relative w-full">
            <input
                value={q}
                onChange={e => setQ(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder={t('search.placeholder')}
                className="w-full px-4 py-3 rounded-2xl bg-card theme-border focus:border-transparent
                outline-none transition-all duration-200 text-sm sm:text-base"
            />
            <SearchSuggestions
                loading={loading}
                items={suggestions}
                onSelect={handleSelect}
                showHistory={showHistory && isFocused}
            />
        </div>
    );
}
