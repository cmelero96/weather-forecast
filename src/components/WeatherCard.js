const WeatherCard = ({ data }) => {
  if (!data) {
    return null;
  }

  const cloudsContent = data.clouds ? `${data.clouds}%` : '-';
  const humidityContent = data.humidity ? `${data.humidity}%` : '-';
  const rainContent = data.rain ? `${data.rain}mm in the last hour` : '-';
  const snowContent = data.snow ? `${data.snow}mm in the last hour` : '-';
  const windContent = data.wind ? (
    <>
      {data.wind.speed && <span>{data.wind.speed}m/s&nbsp;</span>}
      {data.wind.gust && <span>(gusts {data.wind.gust}m/s)&nbsp;</span>}
      {data.wind.deg && <span>{data.wind.deg}deg&nbsp;</span>}
    </>
  ) : (
    '-'
  );
  return (
    <section className="rounded border-4 border-solid border-slate-300">
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
        <div>Clouds: {cloudsContent}</div>
        <div>Humidity: {humidityContent}</div>
        <div>Rain: {rainContent}</div>
        <div>Snow: {snowContent}</div>
        <div>Wind: {windContent}</div>
      </section>
    </section>
  );
};

export default WeatherCard;
