const Country = ({ country, weather }) => {
  if (!country || !weather) {
    return;
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <br />
      <img
        src={country.flags.png}
        alt={`Flag of the country ${country.name.common}`}
      />
      <br />
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  );
};

export default Country;
