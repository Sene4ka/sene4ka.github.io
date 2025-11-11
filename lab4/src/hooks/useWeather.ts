import { useMemo } from 'react';
import { useFetchJson } from './useFetchJson';
import { Coords, Units, Lang, CurrentWeather, ForecastData, AirQualityData } from '../types';

export function useWeather(coords: Coords | null, units: Units, lang: Lang) {
    const params = useMemo(() => {
        if (!coords) return null;
        return `lat=${coords.lat}&lon=${coords.lon}&units=${units}&lang=${lang}`;
    }, [coords?.lat, coords?.lon, units, lang]);

    const weatherUrl = params
        ? `https://api.openweathermap.org/data/2.5/weather?${params}&appid=${import.meta.env.VITE_OWM_API_KEY}`
        : null;

    const forecastUrl = params
        ? `https://api.openweathermap.org/data/2.5/forecast?${params}&appid=${import.meta.env.VITE_OWM_API_KEY}`
        : null;

    const aqiUrl = coords
        ? `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}
        &appid=${import.meta.env.VITE_OWM_API_KEY}`
        : null;

    const { data: weather, loading: weatherLoading, error: weatherError } = useFetchJson<CurrentWeather>(weatherUrl,
        [params]);
    const { data: forecast, loading: forecastLoading, error: forecastError } = useFetchJson<ForecastData>(forecastUrl,
        [params]);
    const { data: aqi, loading: aqiLoading, error: aqiError } = useFetchJson<AirQualityData>(aqiUrl,
        [coords?.lat, coords?.lon]);

    return {
        weather,
        forecast,
        aqi,
        loading: weatherLoading || forecastLoading || aqiLoading,
        error: weatherError || forecastError || aqiError,
    };
}
