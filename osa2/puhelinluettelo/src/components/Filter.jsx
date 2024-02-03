const Filter = ({setFilter, filter}) => {
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const clearFilter = () => {
    setFilter("");
  };

  return (
    <>
      filter names or numbers:{" "}
      <input id="filter" value={filter} onChange={handleFilterChange} />
      <br />
      <button onClick={clearFilter}>Clear filter</button>
    </>
  );
};

export default Filter;