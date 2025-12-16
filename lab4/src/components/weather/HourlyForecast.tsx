import React from 'react';
import { ForecastData } from '../../types';
import { useI18n } from '../../context/I18nContext';
import { useUnits } from '../../context/UnitsContext';
import Icon from '../common/Icon';

interface HourlyForecastProps {
    data: ForecastData | null;
}

const isDayTime = (timestamp: number) => {
    const hour = new Date(timestamp * 1000).getHours();
    return hour >= 6 && hour < 18;
};

const formatHour = (timestamp: number, lang: 'en' | 'ru') => {
    const date = new Date(timestamp * 1000);
    if (lang === 'ru') {
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else {
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours} ${ampm}`;
    }
};

export default function HourlyForecast({ data }: HourlyForecastProps) {
    const { lang, t } = useI18n();
    const { units } = useUnits();

    if (!data || !data.list) return null;

    const tempUnit = units === 'metric' ? '°C' : '°F';
    const windUnit = units === 'metric' ? 'km/h' : 'mph';
    const hourlyData = data.list.slice(0, 5);

    return (
        <div className="bg-card rounded-3xl min-h-[330px] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-theme mb-4 text-center">
                {t('forecast.hourly') || (lang === 'ru' ? 'Почасовой прогноз' : 'Hourly Forecast')}
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2 items-start justify-center">
                {hourlyData.map((item, index) => {
                    const timeText = index === 0
                        ? (lang === 'ru' ? 'Сейчас' : 'Now')
                        : formatHour(item.dt, lang);

                    return (
                        <div
                            key={item.dt}
                            className={`flex-shrink-0 flex flex-col items-center justify-center text-center p-4 
                            rounded-2xl min-w-[120px] ${
                                isDayTime(item.dt)
                                    ? 'bg-gradient-forecast-day'
                                    : 'bg-gradient-forecast-night'
                            }`}
                        >
                            <div className="text-xs font-bold text-theme mb-2">{timeText}</div>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt={item.weather[0].description}
                                className="w-12 h-12 mb-2"
                            />
                            <div className="text-lg font-bold text-theme mb-4">
                                {Math.round(item.main.temp)}{tempUnit}
                            </div>
                            {item.wind.deg !== undefined ? (
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <div style={{ transform: `rotate(${item.wind.deg}deg)` }}>
                                        <Icon name="navigation" className="w-10 h-10 mb-3"/>
                                    </div>
                                    <div className="text-xs font-bold text-theme whitespace-nowrap">
                                        {item.wind.speed} {windUnit}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-xs font-bold text-theme whitespace-nowrap">
                                    {item.wind.speed} {windUnit}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
