import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const AnecdoteMostVoted = ({ index, votes }) => {
  if (votes === 0) return <p>No votes</p>

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 })
  const [mostVoted, setMostVoted] = useState(0)

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    setVotes({
      ...votes,
      [selected]: (votes[selected] || 0) + 1
    })
    if (votes[selected] + 1 > votes[mostVoted]) setMostVoted(selected)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <Button onClick={() => handleVote()} text="vote" />
      <Button onClick={() => handleNextAnecdote()} text="next anecdote" />
      <AnecdoteMostVoted index={mostVoted} votes={votes[mostVoted]} />
    </div>
  )
}

export default App