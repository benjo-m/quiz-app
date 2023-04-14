import { useState } from "react"
import { decodeHTMLEntities, shuffleArray } from "../utils/util.s"

export default function Question(props) {
    const [selected, setSelected] = useState("")

    function changeStyle(e) {
        let arr = Array.from(e.target.parentNode.childNodes)
        let elems = arr.map(c => {
            if (c.className == "answer") {
                c.style.backgroundColor = "white"
                c.style.border = "2px solid rgb(212, 209, 209) "

            }
        })

        e.target.style.backgroundColor = "rgb(207, 204, 204)"
        e.target.style.border = "2px solid #969695"
    }

    let decodedIncorrectAnswers = props.incorrectAnswers.map(ans => decodeHTMLEntities(ans))

    let incorrectAnswers = decodedIncorrectAnswers.map(a => {
        return <div className="answer" key={a} onClick={event => {props.selectAnswer(event); changeStyle(event)}}>{a}</div>
    })

    let allAnswers = shuffleArray([...incorrectAnswers, <div key={props.correctAnswer} 
        className="answer" onClick={event => {props.selectAnswer(event); changeStyle(event)}}>{decodeHTMLEntities(props.correctAnswer)}</div>])

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