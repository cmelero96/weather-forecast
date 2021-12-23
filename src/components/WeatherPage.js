import { useState, useEffect, useCallback } from 'react';
import WeatherCard from './WeatherCard';

const WeatherPage = ({ city, language }) => {
  // TODO: Do something with the timestamp so data is refreshed every X minutes or so
  const [timestamp, setTimestamp] = useState();
  const [weatherData, setWeatherData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&units=metric&appid=68df0554fdd1d96cac26701fac8f2a5f`
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      setTimestamp(data.dt);

      const main = {
        city: data.name,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
        temperature: {
          average: data.main.temp,
          perceived: data.main.feels_like,
          min: data.main.temp_min,
          max: data.main.temp_max,
        },
      };

      const rain = data.rain ? data.rain['1h'] : undefined;
      const snow = data.snow ? data.snow['1h'] : undefined;

      const extra = {
        humidity: data.main.humidity,
        wind: {
          speed: data.wind.speed,
          deg: data.wind.deg,
          gust: data.wind.gust,
        },
        clouds: data.clouds.all,
        rain,
        snow,
      };

      setWeatherData({ ...main, ...extra });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [city, language]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  if (error) {
    return <p>{error}</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  }

  return <WeatherCard data={weatherData}></WeatherCard>;
};

export default WeatherPage;
