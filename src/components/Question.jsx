import { decodeHTMLEntities, shuffleArray } from '../utils/util.s'

export default function Question(props) {
  function changeStyle(e) {
    Array.from(e.target.parentNode.childNodes).map((c) => {
      if (c.className == 'answer') {
        c.style.backgroundColor = 'white'
        c.style.border = '2px solid rgb(212, 209, 209)'
      }
    })
    e.target.style.backgroundColor = 'rgb(207, 204, 204)'
    e.target.style.border = '2px solid #969695'
  }

  let decodedIncorrectAnswers = props.question.incorrect_answers.map((ans) =>
    decodeHTMLEntities(ans)
  )

  let incorrectAnswers = decodedIncorrectAnswers.map((a) => {
    return (
      <div
        className="answer"
        key={a}
        onClick={(event) => {
          props.selectAnswer(event)
          changeStyle(event)
        }}
      >
        {a}
      </div>
    )
  })

  let allAnswers = shuffleArray([
    ...incorrectAnswers,
    <div
      key={props.question.correct_answer}
      className="answer"
      onClick={(event) => {
        props.selectAnswer(event)
        changeStyle(event)
      }}
    >
      {decodeHTMLEntities(props.question.correct_answer)}
    </div>,
  ])

  return (
    <div className="container">
      <h4 className="question">
        {decodeHTMLEntities(props.question.question)}
      </h4>
      {allAnswers}
      {props.pos != props.numberOfQuestions - 1 ? (
        <button className="next-button" onClick={props.handleClick}>
          Next
        </button>
      ) : (
        <button className="next-button" onClick={props.handleEnd}>
          Finish
        </button>
      )}
    </div>
  )
}
