import { useEffect, useState } from 'react'
import StartScreen from './components/StartScreen'
import Header from './components/Header'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import Question from './components/Question'
import EndScreen from './components/EndScreen'

function App() {
  const [questions, setQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [correct, setCorrect] = useState(0)

  function newGame() {
    setGameEnded(false)
    gameStarted(false)
    setSelectedAnswers([])
    setQuestionNumber(0)
    setCorrect(0)
    questions([])
  }


  function fetchData(numberOfQuestions, category, difficulty) {
    fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results)

        let correctArr = data.results.map(ans => ans.correct_answer)
        setCorrectAnswers(correctArr)
      })
    setGameStarted(true)
  }

  let qArr = []
  function createQuestionCards() {
    let questionsArr = questions.map(q => {
      return <Question question={q.question} incorrectAnswers={q.incorrect_answers} 
        correctAnswer={q.correct_answer} handleClick={next} selectAnswer={selectAnswer} 
        pos={questionNumber} numberOfQuestions={questions.length} handleEnd={endGame}/>
    })
    return questionsArr
  }

  qArr = createQuestionCards()

  // console.log(questions)
  console.log(correctAnswers)

  function next() {
    setQuestionNumber(prev => prev + 1)
    // console.log(questionNumber)
  }

  console.log(selectedAnswers)

  function selectAnswer(event) {
    let items = new Array(questions.length) 
    items = selectedAnswers
    items[questionNumber] = event.target.textContent
    setSelectedAnswers(items)
  }

  function endGame() {
    let sum = 0
    if (questionNumber != 0 && questionNumber == questions.length - 1) {

      for (let i = 0; i < correctAnswers.length; i++) {
        if (correctAnswers[i] == selectedAnswers[i])
          sum++
      }
    }

    console.log(`You answered ${sum} / ${questions.length} correctly`)
    setCorrect(sum)
    setGameEnded(true)
  }


  return (
    <div id="main-div">
      <Header />
      {gameStarted && !gameEnded &&
        <div className="questions-div">{qArr[questionNumber]}</div>}
      {!gameStarted && <StartScreen handleFetch={fetchData} />}
      {gameEnded && <EndScreen correct={correct} numberOfQuestions={questions.length} startNewQuiz={newGame} />}
    </div>
  )
}

export default App
