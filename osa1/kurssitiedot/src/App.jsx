const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.title} {props.exercises}
  </p>
);

const Content = (props) => (
  <>
    {props.parts.map((part, index) => (
    <Part 
      key={index}
      title={part.name}
      exercises={part.exercises}
    />
    ))}
  </>
);

const Total = (props) => {
  let total = 0;
  props.parts.forEach(part => total += part.exercises)

  return (
  <p>
    Number of exercises{" "}
    {total}
  </p>
)};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
