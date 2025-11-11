import axios from 'axios';

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

export const geocode = async (q: string, limit = 5) => {
    console.log(`[API] geocode called: "${q}", limit: ${limit}, hasKey: ${hasKey}`);

    if (!hasKey) {
        console.warn('[API] Using MOCK data (no API key)');
        return mockGeocode(limit);
    }

    try {
        const { data } = await client.get('/geo/1.0/direct', { params: { q, limit } });
        console.log('[API] Geocode success:', data);
        return data;
    } catch (error) {
        console.error('[API] Geocode error:', error);
        return [];
    }
};

export const reverseGeocode = async (lat: number, lon: number) => {
    console.log(`[API] reverseGeocode called: ${lat}, ${lon}, hasKey: ${hasKey}`);

    if (!hasKey) {
        console.warn('[API] Using MOCK data (no API key)');
        return mockGeocode(1);
    }

    try {
        const { data } = await client.get('/geo/1.0/reverse', { params: { lat, lon, limit: 1 } });
        return data;
    } catch (error) {
        console.error('[API] Reverse geocode error:', error);
        return null;
    }
};
