import type { Coordinates, Location } from './core';

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface CurrentWeather {
    coord: Coordinates;
    weather: WeatherCondition[];
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        temp_min?: number;
        temp_max?: number;
    };
    wind: {
        speed: number;
        deg?: number;
        gust?: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    name: string;
    visibility?: number;
    clouds?: { all: number };
    dt?: number;
}

export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        temp_min?: number;
        temp_max?: number;
        humidity?: number;
        pressure?: number;
    };
    weather: WeatherCondition[];
    wind: {
        speed: number;
        deg?: number;
    };
    dt_txt?: string;
}

export interface ForecastData {
    list: ForecastItem[];
    city?: Location;
}

export interface AirQualityData {
    list: Array<{
        main: { aqi: 1 | 2 | 3 | 4 | 5 };
        components: {
            pm2_5: number;
            pm10: number;
            no2?: number;
            o3?: number;
            so2?: number;
            co?: number;
        };
    }>;
}