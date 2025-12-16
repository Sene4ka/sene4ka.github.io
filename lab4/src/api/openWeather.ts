import axios from 'axios';
import { City } from '../types';

const BASE = 'https://api.openweathermap.org';
const KEY = import.meta.env.VITE_OWM_API_KEY;

const client = axios.create({
    baseURL: BASE,
    params: { appid: KEY },
});

const hasKey = !!KEY;

const mockGeocode = async (limit = 5) => {
    const cities = [
        { name: 'Athens', lat: 37.9838, lon: 23.7275, country: 'GR' },
        { name: 'Athens', lat: 33.95, lon: -83.38, country: 'US', state: 'Georgia' },
        { name: 'Athène', lat: 45.2853, lon: -75.6748, country: 'CA', state: 'Ontario' },
        { name: 'Athens', lat: 39.33, lon: -82.1, country: 'US', state: 'Ohio' },
        { name: 'Athens', lat: 34.8, lon: -86.97, country: 'US', state: 'Alabama' },
    ];
    return cities.slice(0, limit);
};

export const reverseGeocode = async (
    lat: number,
    lon: number
): Promise<City | null> => {
    console.log(`[API] reverseGeocode called: ${lat}, ${lon}, hasKey: ${hasKey}`);

    if (!hasKey) {
        const mock = await mockGeocode(1);
        return mock[0] ?? null;
    }

    try {
        const response = await client.get<City[]>('/geo/1.0/reverse', {
            params: { lat, lon, limit: 1 },
        });

        return response.data[0] ?? null;
    } catch (error) {
        console.error('[API] Reverse geocode error:', error);
        return null;
    }
};

