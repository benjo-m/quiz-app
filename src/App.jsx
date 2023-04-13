import { useEffect, useState } from 'react'
import StartScreen from './components/StartScreen'
import Header from './components/Header'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import Question from './components/Question'

function App() {
  const [questions, setQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])

  function fetchData(numberOfQuestions, category, difficulty) {
    fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results)
      })
    setGameStarted(true)
  }

  let qArr = []
  function createQuestionCards() {
    let questionsArr = questions.map(q => {
      return <Question question={q.question} incorrectAnswers={q.incorrect_answers} 
        correctAnswer={q.correct_answer} handleClick={next} selectAnswer={selectAnswer}/>
    })
    return questionsArr
  }

  qArr = createQuestionCards()

  // console.log(questions)

  function next() {
    setQuestionNumber(prev => prev + 1)
  }

  function selectAnswer(event) {
    console.log(selectedAnswers)
    setSelectedAnswers(prev => [...prev, event.target.textContent])
  }

  return (
    <div id="main-div">
      <Header />
      {gameStarted &&
        <div className="questions-div">{qArr[questionNumber]}</div>}
      {!gameStarted && <StartScreen handleFetch={fetchData} />}
    </div>
  )
}

export default App
