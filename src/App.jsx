import { useState } from 'react'
import StartScreen from './components/StartScreen'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import Question from './components/Question'
import EndScreen from './components/EndScreen'
import { decodeHTMLEntities } from './utils/util.s'
import { PulseLoader } from 'react-spinners'

export default function App() {
  const [questions, setQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])

  function fetchData(numberOfQuestions, category, difficulty) {
    fetch(
      `https://opentdb.com/api.php?type=multiple&amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results)

        let correctArr = data.results.map((ans) =>
          decodeHTMLEntities(ans.correct_answer)
        )
        setCorrectAnswers(correctArr)
      })
    setGameStarted(true)
  }

  let qArr = []
  function createQuestionCards() {
    let questionsArr = questions.map((question) => {
      return (
        <Question
          key={question.question}
          question={question}
          handleClick={() => setQuestionNumber((prev) => prev + 1)}
          selectAnswer={selectAnswer}
          pos={questionNumber}
          numberOfQuestions={questions.length}
          handleEnd={endGame}
        />
      )
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
    if (questionNumber != 0 && questionNumber == questions.length - 1)
      setGameEnded(true)
  }

  function newGame() {
    setGameEnded(false)
    setGameStarted(false)
    setSelectedAnswers([])
    setQuestionNumber(0)
    setQuestions([])
  }

  let loaderStyle = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
    marginTop: '20%',
  }

  console.log(correctAnswers)
  console.log(selectedAnswers)

  return (
    <div id="main-div">
      {gameStarted && !gameEnded && <div>{qArr[questionNumber]}</div>}
      {!gameStarted && <StartScreen handleFetch={fetchData} />}
      {gameEnded && (
        <EndScreen
          yourAnswers={selectedAnswers}
          correctAnswers={correctAnswers}
          startNewQuiz={newGame}
        />
      )}
      <PulseLoader
        loading={questions.length == 0 && gameStarted}
        cssOverride={loaderStyle}
        color="white"
        size={20}
      />
    </div>
  )
}
