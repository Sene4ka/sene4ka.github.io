import React from 'react';
import { City } from '../../types';

interface SearchSuggestionsProps {
    loading: boolean;
    items: City[];
    onSelect: (item: City) => void;
    showHistory: boolean;
}

export default function SearchSuggestions({ loading, items, onSelect, showHistory }: SearchSuggestionsProps) {
    if (loading) {
        return (
            <div className="absolute left-0 right-0 z-20 bg-white dark:bg-gray-800 shadow rounded mt-1 border border-gray-200 dark:border-gray-600">
                <div className="p-3 text-center text-sm text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!items?.length) return null;

    return (
        <div className="absolute left-0 right-0 z-20 bg-white dark:bg-gray-800 shadow rounded mt-1 border border-gray-200 dark:border-gray-600 max-h-60 overflow-auto">
            {showHistory && items.length > 0 && (
                <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Recent searches
                    </span>
                </div>
            )}
            <ul>
                {items.map((item, index) => (
                    <li
                        key={`${item.name}-${item.lat}-${item.lon}-${index}`}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        onClick={() => onSelect(item)}
                    >
                        <div className="font-medium text-sm text-theme">
                            {item.name}
                        </div>
                        <div className="text-xs text-theme opacity-75">
                            {item.state ? `${item.state}, ` : ''}{item.country}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
