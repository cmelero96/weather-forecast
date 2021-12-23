import './App.css';
import WeatherPage from './components/WeatherPage';

const city = 'Sevilla';
const languages = {
  english: 'en',
  spanish: 'es',
};

function App() {
  /* TODO list of features:
    - Search for a city from a dropdown list and get weather for that city
    - Restrict country if searchable dropdown is too slow
    - Create decent styling (probably using Tailwind)
    - Make extra data hideable by clicking somewhere
    - Remember past-searched cities
    - Put past-searched cities somewhere visible, but collapsed so they don't bother
    - TBD...
  */
  return <WeatherPage city={city} language={languages.english}></WeatherPage>;
}

export default App;
