import { useState } from 'react'
import StartScreen from './components/StartScreen'
import Header from './components/Header'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import Question from './components/Question'

function App() {
  const [questions, setQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)

  function fetchData(numberOfQuestions, category, difficulty) {
    fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results[0].incorrect_answers)
      })
      setGameStarted(true)
  }

  console.log(questions)

  return (
    <div id="main-div">
      <Header />
      {gameStarted && <Question answers={questions}/>}
      {!gameStarted && <StartScreen handleFetch={fetchData}/>}
    </div>
  )
}

export default App
