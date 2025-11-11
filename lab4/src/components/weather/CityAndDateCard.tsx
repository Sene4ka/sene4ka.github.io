import React, { useState, useEffect } from 'react';
import { WeatherData } from '../../types';
import { useI18n } from '../../context/I18nContext';

interface CurrentWeatherCardProps {
    data: WeatherData | null;
}

export default function CityAndDateCard({ data }: CurrentWeatherCardProps) {
    const { lang } = useI18n();
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const locale = lang === 'ru' ? 'ru-RU' : 'en-US';

        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' }));
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [lang]);

    if (!data) return null;

    return (
        <div className="bg-card rounded-3xl p-6 shadow-xl min-h-[360px] flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-theme">{data.name}</h2>
            </div>
            <div className="flex-1 flex items-center justify-center flex-col">
                <div className="text-5xl font-bold text-theme mb-2">{time}</div>
                <div className="text-lg text-theme">{date}</div>
            </div>
        </div>
    );
}
