const CountryList = ({
  country,
  setCountrySearch,
  setCountry,
  countryNames,
  filteredCountries,
}) => {
  const handleSettingCountry = (countryName) => () => {
    setCountrySearch(countryName);
    setCountry(countryNames[countryName]);
  };

  if (!filteredCountries || country) return;

  if (filteredCountries.length === 0) {
    return <p>No countries found!</p>;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify your search more!</p>;
  }

  return filteredCountries.map((country, index) => (
    <p key={index}>
      {country.name.common}{" "}
      <button onClick={handleSettingCountry(country.name.common)}>Show</button>
    </p>
  ));
};

export default CountryList;
