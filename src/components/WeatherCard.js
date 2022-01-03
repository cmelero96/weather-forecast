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
    <section>
      <header className="text-center">
        <h2 className="text-xl font-bold my-2">{data.city}</h2>
        <figure className="align-middle">
          <img className="m-auto" src={data.icon} alt={data.description}></img>
          <figcaption>{data.description.toUpperCase()}</figcaption>
        </figure>
        <section>
          <div>
            {data.temperature.average}ºC (feels like&nbsp;
            {data.temperature.perceived}ºC)
          </div>
          {data.temperature.min !== data.temperature.max && (
            <div>
              <>
                {<span>{data.temperature.min}ºC</span>} -&nbsp;
                {<span>{data.temperature.max}ºC</span>}
              </>
            </div>
          )}
        </section>
      </header>
      <section>
        <h3 className="text-lg font-semibold">Extra data</h3>
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
