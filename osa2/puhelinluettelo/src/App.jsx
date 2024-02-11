import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setFilter={setFilter} filter={filter} />

      <h2>Add a new</h2>

      <PersonForm
        setPersons={setPersons}
        persons={persons}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
