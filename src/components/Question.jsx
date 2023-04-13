export default function Question(props) {
    let ans = props.answers.map(answer => {
        return(
            <div key={answer}>
                <label key={`${answer}1`} htmlFor={answer}>{answer}</label>
                <input key={answer} type="radio" name={answer} id={answer} />
            </div>
        )
    })
    return (
        <div className="question-div">
            <p>Question</p>
            {ans}
        </div>
    )
}