import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad, hasFeedback}) => {

  const all = good + neutral + bad
  const score = good + bad*-1

  if (hasFeedback===0){
    return <div>No feedback given</div>
  } else {
    return (
      <table>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={score/all}/>
        <Statistic text="positive" value={100*good/all + " %"}/>
      </table>
      )
  }
}

const Statistic = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)
  const [hasFeedback, setHasFeedback] = useState(0)

  const all = good + neutral + bad
  const score = good + bad*-1

  const goodClick = () => {
    setGood(good + 1)
    setHasFeedback(1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
    setHasFeedback(1)
  }

  const badClick = () => {
    setBad(bad + 1)
    setHasFeedback(1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={goodClick} text="good" />
        <Button handleClick={neutralClick} text="neutral" />
        <Button handleClick={badClick} text="bad" />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} hasFeedback={hasFeedback} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)