import React from 'react';
import { ForecastItem } from '../../types';
import { useI18n } from '../../context/I18nContext';
import { useUnits } from '../../context/UnitsContext';

interface ForecastDayCardProps {
    data: ForecastItem & { temp_max?: number };
}

export default function ForecastDayCard({ data }: ForecastDayCardProps) {
    const { lang } = useI18n();
    const { units } = useUnits();

    const tempUnit = units === 'metric' ? '°C' : '°F';
    const locale = lang === 'ru' ? 'ru-RU' : 'en-US';

    const dayName = new Date(data.dt * 1000).toLocaleDateString(locale, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });

    const tempMax = data.temp_max ?? data.main.temp_max ?? data.main.temp;

    return (
        <div className="flex items-center justify-between gap-3">
            <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-10 h-10"
            />

            <div className="text-lg font-bold text-theme">
                {Math.round(tempMax)}{tempUnit}
            </div>

            <div className="text-sm font-medium text-theme">{dayName}</div>
        </div>
    );
}