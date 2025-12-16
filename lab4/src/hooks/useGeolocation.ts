import { useState, useEffect } from 'react';
import { Coords } from '../types';

export function useGeolocation() {
    const [coords, setCoords] = useState<Coords | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (err) => {
                setError(err.message);
            }
        );
    }, []);

    return { coords, error };
}
