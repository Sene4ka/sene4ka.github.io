import React from 'react';
import { WeatherData } from '../../types';
import { useI18n } from '../../context/I18nContext';
import { useUnits } from '../../context/UnitsContext';
import Icon from '../common/Icon';

interface WeatherDetailsCardProps {
    data: WeatherData | null;
}

export default function WeatherDetailsCard({ data }: WeatherDetailsCardProps) {
    const { t, lang } = useI18n();
    const { units } = useUnits();

    if (!data) return null;

    const tempUnit = units === 'metric' ? '°C' : '°F';
    const windUnit = units === 'metric' ? 'km/h' : 'mph';

    const formatTime = (timestamp: number) => {
        const locale = lang === 'ru' ? 'ru-RU' : 'en-US';
        return new Date(timestamp * 1000).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="bg-card rounded-3xl p-6 shadow-xl min-h-[360px] flex gap-6">
            <div className="flex-1 flex flex-col justify-start items-center gap-16">
                <div className="w-full flex flex-col items-center">
                    <div className="text-7xl font-bold text-temperature-theme">
                        {Math.round(data.main.temp)}{tempUnit}
                    </div>
                    <div className="text-base font-semibold text-theme mt-1">
                        {t('weather.feels')} {Math.round(data.main.feels_like)}{tempUnit}
                    </div>
                </div>

                <div className="w-full grid grid-rows-2 gap-6">
                    <div className="flex flex-row items-center justify-around">
                        <Icon name="sunrise" className="w-12 h-12" />
                        <div className="flex flex-col items-center">
                            <div className="text-sm font-medium text-theme mt-2">{t('weather.sunrise')}</div>
                            <div className="text-base text-theme mt-1">{formatTime(data.sys.sunrise)}</div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-around">
                        <Icon name="sunset" className="w-12 h-12" />
                        <div className="flex flex-col items-center">
                            <div className="text-sm font-medium text-theme mt-2">{t('weather.sunset')}</div>
                            <div className="text-base text-theme mt-1">{formatTime(data.sys.sunset)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center">
                <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                    alt={data.weather[0].description}
                    className="h-3/4 max-h-[200px] w-auto mb-4"
                />
                <p className="text-xl text-theme capitalize font-medium">
                    {data.weather[0].description}
                </p>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 content-start">
                {[
                    { key: 'humidity', value: `${data.main.humidity}%`, label: t('weather.humidity'),
                        icon: 'humidity' },
                    { key: 'wind', value: `${data.wind.speed} ${windUnit}`, label: t('weather.wind'),
                        icon: 'wind' },
                    { key: 'pressure', value: `${data.main.pressure} hPa`, label: t('weather.pressure'),
                        icon: 'pressure' },
                    { key: 'uv', value: `N/A`, label: 'UV', icon: 'uv' },
                ].map((metric) => (
                    <div
                        key={metric.key}
                        className="flex flex-col items-center justify-center p-4"
                    >
                        <Icon name={metric.icon} className="w-6 h-6 mb-2" />
                        <div className="text-xl font-bold text-theme text-center leading-tight">
                            {metric.value}
                        </div>
                        <div className="text-sm text-theme text-center mt-1">
                            {metric.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}