import type { CurrentWeather, ForecastItem, AirQualityData} from './weather';
import type { Location } from './core';

export interface SearchProps {
    onSelect: (location: Location) => void;
}

export interface WeatherCardProps {
    data: CurrentWeather | null;
}

export interface ForecastCardProps {
    item: ForecastItem;
}

export interface AQICardProps {
    data: AirQualityData | null;
}

export interface SearchHistoryItem extends Location {
    timestamp: number;
}