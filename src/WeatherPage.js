import { useState, useEffect, useCallback } from 'react';

const WeatherPage = ({ city, lang }) => {
  const [timestamp, setTimestamp] = useState();
  const [mainData, setMainData] = useState();
  const [extraData, setExtraData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&units=metric&appid=68df0554fdd1d96cac26701fac8f2a5f`
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      setTimestamp(data.dt);

      const main = {
        info: {
          city: data.name,
          weather: data.weather[0].main,
          description: data.weather[0].description,
          icons: {
            small: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            medium: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            large: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
          },
        },
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
        pressure: data.main.pressure,
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

      setMainData(main);
      setExtraData(extra);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [city, lang]);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  if (error) {
    return <p>{error}</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <div>{JSON.stringify(mainData)}</div>
        <div>{JSON.stringify(extraData)}</div>
      </div>
    );
  }
};

export default WeatherPage;
