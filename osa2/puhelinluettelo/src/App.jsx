import { useEffect, useState } from "react";
import axios from 'axios';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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
      
      <Persons persons={persons} filter={filter} />

    </div>
  );
};

export default App;
