const WeatherCard = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <section>
      <header>
        <h2>{data.city}</h2>
        <figure>
          <img src={data.icon} alt={data.description}></img>
          <figcaption>{data.description.toUpperCase()}</figcaption>
        </figure>
        <section>
          <div>
            {data.temperature.average}ºC (feels like&nbsp;
            {data.temperature.perceived}ºC)
          </div>
          <div>
            <span>{data.temperature.min}ºC</span> -&nbsp;
            <span>{data.temperature.max}ºC</span>
          </div>
        </section>
      </header>
      <section>
        <h3>Extra data</h3>
        <div>Clouds: {data.clouds}%</div>
        <div>Humidity: {data.humidity}%</div>
        <div>Rain: {data.rain}mm in the last hour</div>
        <div>Snow: {data.snow}mm in the last hour</div>
        <div>
          Wind:&nbsp;
          <span>{data.wind.speed}m/s</span>
          <span>{data.wind.deg}deg</span>
          <span>{data.wind.gust}m/s</span>
        </div>
      </section>
    </section>
  );
};

export default WeatherCard;
