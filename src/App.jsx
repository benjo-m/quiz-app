import { useState } from 'react'
import StartScreen from './components/StartScreen'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import Question from './components/Question'
import EndScreen from './components/EndScreen'
import { decodeHTMLEntities } from './utils/util.s'

export default function App() {
  const [questions, setQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [correct, setCorrect] = useState(0)

  function fetchData(numberOfQuestions, category, difficulty) {
    fetch(`https://opentdb.com/api.php?type=multiple&amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results)

        let correctArr = data.results.map(ans => decodeHTMLEntities(ans.correct_answer))
        setCorrectAnswers(correctArr)
      })
    setGameStarted(true)
  }

  let qArr = []
  function createQuestionCards() {
    let questionsArr = questions.map(question => {
      return <Question
        question={question}
        handleClick={() => setQuestionNumber(prev => prev + 1)}
        selectAnswer={selectAnswer}
        pos={questionNumber}
        numberOfQuestions={questions.length}
        handleEnd={endGame} />
    })
    return questionsArr
  }

  qArr = createQuestionCards()

  function selectAnswer(event) {
    let items = new Array(questions.length)
    items = selectedAnswers
    items[questionNumber] = event.target.textContent
    setSelectedAnswers(items)
  }

  function endGame() {
    let sum = 0
    if (questionNumber != 0 && questionNumber == questions.length - 1)
      for (let i = 0; i < correctAnswers.length; i++)
        if (correctAnswers[i] == selectedAnswers[i])
          sum++
    setCorrect(sum)
    setGameEnded(true)
  }

  function newGame() {
    setGameEnded(false)
    setGameStarted(false)
    setSelectedAnswers([])
    setQuestionNumber(0)
    setCorrect(0)
    setQuestions([])
  }

  return (
    <div id="main-div">
      {gameStarted && !gameEnded &&
        <div>{qArr[questionNumber]}</div>}
      {!gameStarted && <StartScreen handleFetch={fetchData} />}
      {gameEnded && <EndScreen correct={correct} numberOfQuestions={questions.length} startNewQuiz={newGame} />}
    </div>
  )
}
