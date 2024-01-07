import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ grades }) => {
  /*
    The "Object.values(grades)" returns object values as an array and ".reduce()" sums the array values together:
    "sum" variable holds the sum starting from the initial value, currentValue is the current value from the array
    and "0" defines the initial value for the sum variable. In the end "sum" is returned to the "all" constant.
  */
  const all = Object.values(grades).reduce(
    (sum, currentValue) => sum + currentValue,
    0
  );

  if (!all) {
    return (
      <>
        <h1>Statistics</h1>

        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h1>Statistics</h1>

      <table>
        <tbody>
          <StatisticLine text="Good" value={grades.good} />
          <StatisticLine text="Neutral" value={grades.neutral} />
          <StatisticLine text="Bad" value={grades.bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine
            text="Average"
            value={(grades.good - grades.bad) / all}
          />
          <StatisticLine
            text="Positive"
            value={`${(grades.good / all) * 100} %`}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics grades={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  );
};

export default App;
