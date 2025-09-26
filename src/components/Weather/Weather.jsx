import React, { useState } from 'react';
import "./weather.css";
import search_icon from "../../assets/search.png";
import humidity_icon from "../../assets/humidity.png";
import wind_icon from "../../assets/wind.png";


const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = "21ea378773c34ac0b8c122826252609";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type="text"
          placeholder='Search...'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <img src={search_icon} alt="Search" onClick={fetchWeather} />
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt="Weather Icon"
            className='weather-icon'
          />
          <p className='temperature'>{weatherData.current.temp_c}°C</p>
          <p className='location'>{weatherData.location.name}, {weatherData.location.country}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.current.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="Wind" />
              <div>
                <p>{weatherData.current.wind_kph} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
