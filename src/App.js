import './App.css';
import WeatherPage from './components/WeatherPage';
import SearchList from './components/SearchList';
import { useState } from 'react';
import allCities from './city.list.json';

const languages = {
  english: 'en',
  spanish: 'es',
};
const countries = [
  { value: 'Spain', label: 'Spain', code: 'ES' },
  { value: 'USA', label: 'United States', code: 'US' },
];

const getCitiesByCountry = (countryCode) => {
  return allCities
    .filter((city) => city.country === countryCode)
    .map((city) => {
      return { value: city.name, label: city.name };
    });
};

function App() {
  /* TODO list of features:
    - Search for a city from a dropdown list and get weather for that city
    - Restrict country if searchable dropdown is too slow
    - Create decent styling (probably using Tailwind)
    - Make extra data hideable by clicking somewhere
    - Remember past-searched cities
    - Put past-searched cities somewhere visible, but collapsed so they don't bother
    - Add localization to strings
    - Make website accessible
  */

  const [country, setCountry] = useState(null);
  const [city, setCity] = useState('');

  const selectCountryHandler = (country) => {
    setCountry(country);
    setCity('');
  };

  const selectCityHandler = (city) => {
    setCity(city.label);
  };

  console.log(country);
  console.log(city);

  return (
    <>
      <SearchList
        value={(country && country.label) || ''}
        options={countries}
        onSelect={selectCountryHandler}
        placeholder="Select your country"
      ></SearchList>
      {country && (
        <SearchList
          value={city}
          options={getCitiesByCountry(country.code)}
          onSelect={selectCityHandler}
          placeholder="Select your city"
        ></SearchList>
      )}
      {city && (
        <WeatherPage city={city} language={languages.english}></WeatherPage>
      )}
    </>
  );
}

export default App;
