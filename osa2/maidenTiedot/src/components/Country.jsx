const Country = ({ country }) => {
  if (!country) {
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
    </>
  );
};

export default Country;
