export default function EndScreen(props) {
    return (
        <div id="end-screen-div">
            <h1>End screen</h1>
            <p>You answered {props.correct} out of {props.numberOfQuestions} correctly!</p>
            <button onClick={props.startNewQuiz}>Start new quiz</button>
        </div>
    )
}