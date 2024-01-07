import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
  // "votes" is initiated with an array that is same length as "anecdotes" and filled with zeros
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(-1)

  const findMaxIndex = (array) => {
    // If the array is empty then function returns -1
    if (array.length === 0) {
      return -1;
    }

    let max = array[0];
    let maxIndex = 0;

    // Loop goes through array elements and checks if there is elements larger than the initial element.
    // If larger element is found then "max" is changed to that element and "maxIndex" is changed to the element index.
    for (let i = 1; i < array.length; i++) {
      if (array[i] > max) {
        maxIndex = i;
        max = array[i];
      }
    }

    // In the end the "maxIndex" value is returned
    return maxIndex;
  }

  const handleAnecdote = () => {
      const randomAnecdoteIndex = () => (
        // "Math.random()" returns random values that are greater than or equal to 0 and less than 1.
        // "Math.random()*anecdotes.length" returns values that are greater than or equal to 0 and less than anecdotes.length
        // "Math.floor()" rounds values down to the closest integer value, e.g. 5.01 => 5, 4.99 => 4
        // "setSelected()" gets random integer values between 0 and anecdotes.length - 1
        setSelected(Math.floor(Math.random()*anecdotes.length))
      );

      return randomAnecdoteIndex;
  };

  const handleVote = () => {
    const voteAnecdote = () => {
      // "votes" array is copied and then the element in the "selected" index is incremented by one.
      const copy = [...votes];
      copy[selected] += 1;

      // "findMaxIndex()" is used to find the index with most votes.
      // If "newMostVoted" is different than "mostVoted" it is set as the new most voted index.
      const newMostVoted = findMaxIndex(copy);
      if (!(mostVoted === newMostVoted)) setMostVoted(newMostVoted);

      // "copy" with the incremented value is set to the "votes".
      setVotes(copy);
    }
    return voteAnecdote;
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Current anecdote has {votes[selected]} votes</p>

      <button onClick={handleVote()}>Vote</button>
      <button onClick={handleAnecdote()}>Next anecdote</button>

      <h1>Anecdote with most votes</h1>

      {!(mostVoted === -1) ? <><p>{anecdotes[mostVoted]}</p><p>Most voted anecdote has {votes[mostVoted]} votes</p></> : <p>No votes given</p>}
    </>
  )
}

export default App