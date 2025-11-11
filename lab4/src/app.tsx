import React, { useState, useMemo } from 'react';
import AppShell from './components/layout/AppShell';
import Header from './components/layout/Header';
import CityAndDateCard from './components/weather/CityAndDateCard';
import WeatherDetailsCard from './components/weather/WeatherDetailsCard';
import HourlyForecast from './components/weather/HourlyForecast';
import ForecastList from './components/weather/ForecastList';
import { Loader } from './components/common/Loader';
import { ErrorState } from './components/common/ErrorState';
import { useWeather } from './hooks/useWeather';
import { useUnits } from './context/UnitsContext';
import { useI18n } from './context/I18nContext';
import type { Location } from './types';

function App() {
    const [currentCity, setCurrentCity] = useState<Location | null>({
        name: 'Moscow',
        country: 'RU',
        lat: 55.7558,
        lon: 37.6173
    });

    const { units } = useUnits();
    const { lang } = useI18n();

    const coords = useMemo(
        () => (currentCity ? { lat: currentCity.lat, lon: currentCity.lon } : null),
        [currentCity?.lat, currentCity?.lon]
    );

    const { weather, forecast, loading, error } = useWeather(coords, units, lang);

    const handleCitySelect = (city: Location) => {
        setCurrentCity(city);
    };

    const handleCurrentLocation = (city: Location) => {
        setCurrentCity(city);
    };

    return (
        <AppShell>
            <Header onSelect={handleCitySelect} onCurrentLocation={handleCurrentLocation} />

            {/*loading && <Loader />*/}
            {error && <ErrorState message={error} />}

            {weather && forecast ? (
                <>
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="col-span-12 md:col-span-4">
                            <CityAndDateCard data={weather} />
                        </div>
                        <div className="col-span-12 md:col-span-8">
                            <WeatherDetailsCard data={weather} />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-3">
                            <ForecastList data={forecast} />
                        </div>
                        <div className="col-span-12 md:col-span-9">
                            <HourlyForecast data={forecast} />
                        </div>
                    </div>
                </>
            ) : (
                !loading && <div className="text-center text-theme p-8">{lang === 'ru' ? 'Нет данных' : 'No data'}</div>
            )}
        </AppShell>
    );
}

export default App;
