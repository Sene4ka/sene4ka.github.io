import React from 'react';
import ThemeToggle from './ThemeToggle';
import UnitsToggle from './UnitsToggle';
import LanguageToggle from './LanguageToggle';
import SearchBar from "../search/SearchBar";
import CurrentLocation from "./CurrentLocation";
import { City } from '../../types';

interface HeaderProps {
    onSelect: (city: City) => void;
    onCurrentLocation: (city: City) => void;
}

export default function Header({ onSelect, onCurrentLocation }: HeaderProps){
    return (
        <header className="w-full mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                    <ThemeToggle />
                    <LanguageToggle />
                    <UnitsToggle />
                </div>
                <div className="flex-1 min-w-0">
                    <SearchBar onSelect={onSelect} />
                </div>
                <div className="shrink-0">
                    <CurrentLocation onLocationSelect={onCurrentLocation} />
                </div>
            </div>
        </header>
    );
}
