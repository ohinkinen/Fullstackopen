const Persons = ({persons, filter}) => (
  <>
    {persons
      .filter(
        (person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()) ||
          person.number.includes(filter)
      )
      .map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
  </>
);

export default Persons;