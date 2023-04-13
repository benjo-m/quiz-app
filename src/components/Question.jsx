export default function Question(props) {
    // const [selectedAnswers, setSelectedAnswers] = useState([])

    // function selectAnswer(event) {
    //     setSelectedAnswers(prev => [...prev, event.target.textContent])
    // }

    let incorrectAnswers = props.incorrectAnswers.map(a => {
        return <div className="answer" key={a} onClick={event => props.selectAnswer(event)}>{a}</div>
    })

    let allAnswers = [...incorrectAnswers, <div key={props.correctAnswer} className="answer" onClick={event => props.selectAnswer(event)}>{props.correctAnswer}</div>]
    
    return (
        <div className="questions-div">
            <div className="answers-div">
                    <h4>{props.question}</h4>
                        {allAnswers}
                    <button className="btn btn-success" onClick={props.handleClick}>Next</button>
                </div>
        </div>
    )
}