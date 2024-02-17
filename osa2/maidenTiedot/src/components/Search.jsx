const Search = ({ countrySearch, setCountrySearch }) => {
  const handleSearchChange = (event) => {
    setCountrySearch(event.target.value);
  };

  const clearSearch = () => {
    setCountrySearch("");
  };

  return (
    <>
      find countries{" "}
      <input type="text" value={countrySearch} onChange={handleSearchChange} />{" "}
      <button onClick={clearSearch}>Clear Search</button>
    </>
  );
};

export default Search;
