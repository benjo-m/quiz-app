import { decodeHTMLEntities, shuffleArray } from "../utils/util.s"

export default function Question(props) {
    let decodedIncorrectAnswers = props.incorrectAnswers.map(ans => decodeHTMLEntities(ans))

    let incorrectAnswers = decodedIncorrectAnswers.map(a => {
        return <div className="answer" key={a} onClick={event => props.selectAnswer(event)}>{a}</div>
    })

    let allAnswers = shuffleArray([...incorrectAnswers, <div key={props.correctAnswer} 
        className="answer" onClick={event => props.selectAnswer(event)}>{decodeHTMLEntities(props.correctAnswer)}</div>])

    return (
        <div className="container">
            <h4 className="question">{decodeHTMLEntities(props.question)}</h4>
            {allAnswers}
            {props.pos != props.numberOfQuestions - 1
                ? <button className="next-button" onClick={props.handleClick}>Next</button>
                : <button className="next-button" onClick={props.handleEnd}>Finish</button>}
        </div>
    )
}