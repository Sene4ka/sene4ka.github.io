import React from 'react';
import { ForecastData } from '../../types';
import { useI18n } from '../../context/I18nContext';
import ForecastDayCard from './ForecastDayCard';

interface ForecastListProps {
    data: ForecastData | null;
}

export default function ForecastList({ data }: ForecastListProps) {
    const { t } = useI18n();

    if (!data || !data.list) return null;

    const dailyData = data.list.reduce((acc: any[], item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!acc.find(d => d.date === date)) {
            acc.push({
                date,
                ...item,
                temp_max: item.main.temp_max
            });
        }
        return acc;
    }, []).slice(0, 5);

    return (
        <div className="bg-card rounded-3xl min-h-[330px] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-theme mb-4 text-center">
                {t('forecast.5days')}
            </h3>

            <div className="flex flex-col gap-2 items-center">
                {dailyData.map((day) => (
                    <ForecastDayCard key={day.date} data={day} />
                ))}
            </div>
        </div>
    );
}