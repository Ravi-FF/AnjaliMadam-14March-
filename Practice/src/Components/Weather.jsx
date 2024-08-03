import React, { useState } from 'react';

export default function Weather() {
    const [searchCity, setSearchCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const API_KEY = 'e43c2ed0acdf4e949fb80808240208';
    const FetchWeather = async () => {
        if (!searchCity) {
            setError('Please enter a city name.');
            return;
        }

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchCity}&aqi=yes`);

            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            setWeatherData(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchCity}
                placeholder="Enter Your City....!"
                onChange={(e) => setSearchCity(e.target.value.trim())}
            />
            <button onClick={FetchWeather}>Search Weather</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherData && (
                <div>
                    <h3>Weather in {weatherData.location.name}</h3>
                    <p>Temperature: {weatherData.current.temp_c}°C</p>
                    <p>Condition: {weatherData.current.condition.text}</p>
                    <p>Humidity: {weatherData.current.humidity}%</p>
                </div>
            )}
        </div>
    );
}
