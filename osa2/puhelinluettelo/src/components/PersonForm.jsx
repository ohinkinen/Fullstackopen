import personService from "../services/persons";

const PersonForm = ({
  setPersons,
  persons,
  setNewName,
  newName,
  setNewNumber,
  newNumber,
  setMessage,
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
          `${newName} has been already added to the phonebook.\n\nDo you want replace the old number "${persons[duplicateIndex].number}" with the new one "${newNumber}"?`
        )
      ) {
        await personService
          .update(persons[duplicateIndex].id, personObject)
          .then((updatedPerson) => {
            setMessage({
              error: false,
              data: `${updatedPerson.name} updated successfully!`,
            });
            setTimeout(() => {
              setMessage(null);
            }, 7000);
            const updatedPersons = persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            );
            setPersons(updatedPersons);
          })
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              setMessage({
                error: true,
                data: `${newName} doesn't exist in the server`,
              });
              setPersons(persons.toSpliced(duplicateIndex, 1));
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
    } else {
      personService
        .create(personObject)
        .then((newPerson) => {
          setMessage({
            error: false,
            data: `${newPerson.name} added successfully!`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 7000);
          setPersons(persons.concat(newPerson));
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
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

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
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
