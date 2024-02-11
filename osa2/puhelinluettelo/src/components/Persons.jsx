import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter }) => {
  const deleteAndFilter = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        personService
          .deletePerson(id, name)
          .then((deletedPerson) => {
            window.alert(`${name} deleted successfully!`);
            setPersons(
              persons.filter((person) => person.id !== deletedPerson.id)
            );
          })
          .catch((error) => {
            console.error(error);
            alert("Something went wrong!");
          });
      }
    };
  };

  return (
    <>
      {persons
        .filter(
          (person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()) ||
            person.number.includes(filter)
        )
        .map((person) => (
          <p key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={deleteAndFilter(person.id, person.name)}>
              Delete
            </button>
          </p>
        ))}
    </>
  );
};

export default Persons;
