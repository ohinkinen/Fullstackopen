const Header = (props) => <h2>{props.course}</h2>;

const Part = (props) => (
  <p>
    {props.title} {props.exercises}
  </p>
);

const Content = (props) => (
  <>
    {props.parts.map((part) => (
      <Part key={part.id} title={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Total = (props) => {
  let total = props.parts.reduce((sum, part) => sum += part.exercises, 0);

  return <p><b>Total of {total} exercises</b></p>;
};

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;
