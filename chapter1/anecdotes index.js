import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostPointsIndex, setMostPointsIndex] = useState(0)
  

  const onAnecdoteClick = () => {
    const roll = Math.floor((Math.random() * anecdotes.length))

    setSelected(roll)
    console.log("roll", roll)
  }

  const onVoteClick = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    
    setPoints(pointsCopy)
    console.log("points", pointsCopy)

    const maxPoints = Math.max(...pointsCopy)
    const maxPointsIndex = pointsCopy.indexOf(maxPoints)
    setMostPointsIndex(maxPointsIndex)
    console.log("maxPoints", maxPoints, "maxPointsIndex", maxPointsIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleClick={onVoteClick} text="vote" />
      <Button handleClick={onAnecdoteClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostPointsIndex]}</div>
      <div>has {points[mostPointsIndex]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)