import './App.css';
import WeatherPage from './WeatherPage';

const city = 'Sevilla';
const languages = {
  english: 'en',
  spanish: 'es',
};

function App() {
  return <WeatherPage city={city} language={languages.spanish}></WeatherPage>;
}

export default App;
