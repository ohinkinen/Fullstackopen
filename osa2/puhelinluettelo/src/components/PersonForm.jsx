import personService from "../services/persons";

const PersonForm = ({
  setPersons,
  persons,
  setNewName,
  newName,
  setNewNumber,
  newNumber,
}) => {
  const addPerson = async (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    let duplicateIndex = persons.findIndex((person) => person.name === newName);
    if (duplicateIndex !== -1) {
      if (
        window.confirm(
          `${newName} has been already added to the phonebook. Do you want replace the old number "${persons[duplicateIndex].number}" with the new one "${newNumber}"?`
        )
      ) {
        await personService
          .update(persons[duplicateIndex].id, personObject)
          .then((updatedPerson) => {
            alert(`${updatedPerson.name} updated successfully!`);
            const updatedPersons = persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            );
            setPersons(updatedPersons);
          })
          .catch((error) => {
            console.error(error);
            alert("Something went wrong!");
          });
      }
    } else {
      personService.create(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
