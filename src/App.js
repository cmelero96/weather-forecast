import './App.css';
import WeatherPage from './components/WeatherPage';

const city = 'Sevilla';
const languages = {
  english: 'en',
  spanish: 'es',
};

function App() {
  return <WeatherPage city={city} language={languages.english}></WeatherPage>;
}

export default App;
