import { useEffect, useState } from "react";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import Country from "./components/Country";
import countryService from "./services/countries";
import weatherService from "./services/weather";

function App() {
  const [countries, setCountries] = useState(null);
  const [countryNames, setCountryNames] = useState(null);
  const [countrySearch, setCountrySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getCountries().then((countries) => {
      const countriesObject = {};
      countries.forEach((country) => {
        countriesObject[country.name.common] = country;
      });
      setCountryNames(countriesObject);
      setCountries(countries);
    });
  }, []);

  useEffect(() => {
    if (!countries || !countrySearch || !countryNames) {
      setCountry(null);
      setFilteredCountries(null);
      return;
    }

    if (countrySearch in countryNames) {
      setCountry(countryNames[countrySearch]);
      return;
    } else {
      setCountry(null);
    }

    let filterCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
    );

    if (filterCountries.length === 1) {
      setFilteredCountries(null);
      setCountry(filterCountries[0]);
    } else {
      setFilteredCountries(filterCountries);
    }
  }, [countrySearch]);

  useEffect(() => {
    if (!country) {
      setWeather(null);
      return;
    }

    weatherService.getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]).then((weather) => {
      setWeather(weather);
    });
  }, [country]);

  return (
    <>
      <Search
        countrySearch={countrySearch}
        setCountrySearch={setCountrySearch}
      />

      <CountryList
        country={country}
        setCountrySearch={setCountrySearch}
        setCountry={setCountry}
        countryNames={countryNames}
        filteredCountries={filteredCountries}
      />

      <Country country={country} weather={weather} />
    </>
  );
}

export default App;
