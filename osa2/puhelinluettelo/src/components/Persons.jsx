import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter, setMessage }) => {
  const deleteAndFilter = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        personService
          .deletePerson(id, name)
          .then((deletedPerson) => {
            setMessage({
              error: false,
              data: `${deletedPerson.name} deleted successfully!`,
            });
            setTimeout(() => {
              setMessage(null);
            }, 7000);
            setPersons(
              persons.filter((person) => person.id !== deletedPerson.id)
            );
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setMessage({
                error: true,
                data: `${name} doesn't exist in the server`,
              });
              setPersons(persons.filter(person => person.id !== id));
            } else if (error.code === "ERR_NETWORK") {
              setMessage({
                error: true,
                data: "Failed to connect to server, try again!",
              });
            } else {
              setMessage({
                error: true,
                data: `Something went wrong, try again!`,
              });
            }
            setTimeout(() => {
              setMessage(null);
            }, 7000);
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
