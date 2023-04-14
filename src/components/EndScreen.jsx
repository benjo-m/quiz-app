export default function EndScreen(props) {
    return (
        <div id="end-screen-div">
            <h4>You answered {props.correct} out of {props.numberOfQuestions} correctly!</h4>
            <button className="btn btn-primary" onClick={props.startNewQuiz}>Start new quiz</button>
        </div>
    )
}