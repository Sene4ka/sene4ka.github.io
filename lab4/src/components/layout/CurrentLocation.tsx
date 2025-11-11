import React from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { reverseGeocode } from '../../api/openWeather';
import Icon from '../common/Icon';
import { City } from '../../types';

interface CurrentLocationButtonProps {
    onLocationSelect: (city: City) => void;
}

export default function CurrentLocation({ onLocationSelect }: CurrentLocationButtonProps) {
    const { coords, error: geoError } = useGeolocation();

    const handleClick = async () => {
        if (!coords) {
            alert('Geolocation not available');
            return;
        }

        try {
            const cityData = await reverseGeocode(coords.lat, coords.lon);
            if (cityData) {
                onLocationSelect(cityData);
            }
        } catch (err) {
            console.error('Reverse geocoding failed:', err);
            alert('Failed to get city name');
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={!coords}
            className="flex items-center gap-2 bg-card text-white theme-location rounded-full px-4 py-3 transition-all
            duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Icon name="location" className="w-7 h-7"/>

            <span className="hidden sm:inline whitespace-nowrap">
                {geoError ? 'Location Off' : 'Current Location'}
            </span>
        </button>
    );
}