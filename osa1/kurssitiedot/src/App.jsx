const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.title} {props.exercises}
  </p>
);

const Content = (props) => (
  <>
    <Part title={props.contentObject.p1} exercises={props.contentObject.e1} />
    <Part title={props.contentObject.p2} exercises={props.contentObject.e2} />
    <Part title={props.contentObject.p3} exercises={props.contentObject.e3} />
  </>
);

const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.totalObject.e1 + props.totalObject.e2 + props.totalObject.e3}
  </p>
);

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const contentObject = {
    p1: part1,
    e1: exercises1,
    p2: part2,
    e2: exercises2,
    p3: part3,
    e3: exercises3,
  };
  const totalObject = { e1: exercises1, e2: exercises2, e3: exercises3 };

  return (
    <>
      <Header course={course} />
      <Content contentObject={contentObject} />
      <Total totalObject={totalObject} />
    </>
  );
};

export default App;
