const express = require("express");
const app = express();
const port = 3001;
const persons = {
  persons: [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: "1",
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: "2",
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: "3",
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: "4",
    },
  ],
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`This is an Express server running on port ${port}!`);
});

app.get("/api/persons", (req, res) => {
  res.send(persons.persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const person = persons.persons.find((person) => person.id === id);

  if (person) {
    res.send(person);
  } else {
    res.status(404).send("Person not found!");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const person = persons.persons.find((person) => person.id === id);

  if (person) {
    persons.persons = persons.persons.filter((person) => person.id !== id);
    res.send("Person deleted successfully!");
  } else {
    res.status(404).send("Person not found!");
  }
});

app.post("/api/persons", (req, res) => {
  const names = persons.persons.map((person) => person.name);
  const numbers = persons.persons.map((person) => person.number);
  
  if (!req.body.name) {
    return res.status(400).json({ error: "Name not found" });
  }

  if (!req.body.number) {
    return res.status(400).json({ error: "Number not found" });
  }

  if (names.includes(req.body.name) || numbers.includes(req.body.number)) {
    return res.status(400).json({ error: "Name and number must be unique" });
  }

  const ids = persons.persons.map((person) => person.id);

  const newId = Math.floor(Math.random() * 1000000).toString();

  while (ids.includes(newId)) {
    newId = Math.floor(Math.random() * 1000000);
  }

  const newPerson = {
    name: req.body.name,
    number: req.body.number,
    id: newId,
  };

  persons.persons = persons.persons.concat(newPerson);

  console.log(persons.persons);

  res.status(201).end();
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${
      persons.persons.length
    } people<br/><br/>${new Date(Date.now()).toString()}`
  );
});

app.listen(port, () => {
  console.log(`This application is listening to port ${port}`);
});
