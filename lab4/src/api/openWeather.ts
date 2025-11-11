import axios from 'axios';

const BASE = 'https://api.openweathermap.org';
const KEY = import.meta.env.VITE_OWM_API_KEY;

const client = axios.create({
    baseURL: BASE,
    params: { appid: KEY },
});

const hasKey = !!KEY;

const mockGeocode = async (q: string, limit = 5) => {
    const cities = [
        { name: 'Athens', lat: 37.9838, lon: 23.7275, country: 'GR' },
        { name: 'Athens', lat: 33.95, lon: -83.38, country: 'US', state: 'Georgia' },
        { name: 'Athène', lat: 45.2853, lon: -75.6748, country: 'CA', state: 'Ontario' },
        { name: 'Athens', lat: 39.33, lon: -82.1, country: 'US', state: 'Ohio' },
        { name: 'Athens', lat: 34.8, lon: -86.97, country: 'US', state: 'Alabama' },
    ];
    return cities.slice(0, limit);
};

const mockCurrent = async (lat: number, lon: number, units = 'metric', lang = 'en') => {
    return {
        coord: { lat, lon },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        main: { temp: 24, feels_like: 22, humidity: 41, pressure: 997 },
        wind: { speed: 2 },
        sys: { sunrise: 1629884220, sunset: 1629930420 },
        name: 'Athens',
    };
};

const mockForecast = async (lat: number, lon: number, units = 'metric', lang = 'en') => {
    const now = Math.floor(Date.now() / 1000);
    const list = [0, 6, 12, 18, 24].map((h, i) => ({
        dt: now + h * 3600,
        main: { temp: 24 + (i % 3), temp_min: 20 + i, temp_max: 26 + i },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 3 + i },
        dt_txt: new Date((now + h * 3600) * 1000).toISOString(),
    }));
    return { list };
};

export const geocode = async (q: string, limit = 5) => {
    console.log(`[API] geocode called: "${q}", limit: ${limit}, hasKey: ${hasKey}`);

    if (!hasKey) {
        console.warn('[API] Using MOCK data (no API key)');
        return mockGeocode(q, limit);
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
        return mockGeocode('', 1);
    }

    try {
        const { data } = await client.get('/geo/1.0/reverse', { params: { lat, lon, limit: 1 } });
        return data;
    } catch (error) {
        console.error('[API] Reverse geocode error:', error);
        return null;
    }
};

export const getCurrentWeather = async (lat: number, lon: number, units = 'metric', lang = 'en') => {
    console.log(`[API] getCurrentWeather called: ${lat}, ${lon}`);

    try {
        const { data } = await client.get('/data/2.5/weather', { params: { lat, lon, units, lang } });
        return data;
    } catch (error) {
        console.error('[API] Current weather error:', error);
        return null;
    }
};

export const getForecast5 = async (lat: number, lon: number, units = 'metric', lang = 'en') => {
    console.log(`[API] getForecast5 called: ${lat}, ${lon}, hasKey: ${hasKey}`);

    if (!hasKey) {
        console.warn('[API] Using MOCK forecast data');
        return mockForecast(lat, lon, units, lang);
    }

    try {
        const { data } = await client.get('/data/2.5/forecast', { params: { lat, lon, units, lang } });
        return data;
    } catch (error) {
        console.error('[API] Forecast error:', error);
        return { list: [] };
    }
};

