import Answers from './Answers'

export default function EndScreen({
  yourAnswers,
  correctAnswers,
  startNewQuiz,
}) {
  function correctAnswersCount() {
    let sum = 0
    for (let i = 0; i < correctAnswers.length; i++)
      if (correctAnswers[i] == yourAnswers[i]) sum++
    return sum
  }

  return (
    <div id="end-screen-div">
      <h3>
        You answered {correctAnswersCount()} out of {correctAnswers.length}{' '}
        correctly!
      </h3>

      <Answers correctArr={correctAnswers} selectedArr={yourAnswers} />

      <button className="btn btn-primary" onClick={startNewQuiz}>
        Start new quiz
      </button>
    </div>
  )
}
