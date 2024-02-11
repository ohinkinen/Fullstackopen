import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    }).catch(error => {
      if (error.code === "ERR_NETWORK") {
        setMessage({error: true, data: "Failed to connect to server, try again!"})
      } else {
        setMessage({error: true, data: "Something went wrong, try again later!"})
      }
      setTimeout(() => {
        setMessage(null)
      }, 7000)
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter setFilter={setFilter} filter={filter} />

      <h2>Add a new</h2>

      <PersonForm
        setPersons={setPersons}
        persons={persons}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        setMessage={setMessage}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons={setPersons} filter={filter} setMessage={setMessage} />
    </div>
  );
};

export default App;
