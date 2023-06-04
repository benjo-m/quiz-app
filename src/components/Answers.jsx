export default function Answers({ correctArr, selectedArr }) {
  function correctAnswers() {
    let cor = []
    for (let i = 0; i < correctArr.length; i++)
      if (correctArr[i] == selectedArr[i]) {
        cor[i] = <p style={{ color: '#04b02c' }}>{selectedArr[i]}</p>
      } else {
        cor[i] = <p style={{ color: 'red' }}>{selectedArr[i]}</p>
      }
    return cor
  }

  return (
    <div className="answers-div">
      <div className="correct-div">
        <h4>Correct answers</h4>
        {correctArr.map((a) => (
          <p key={a}>{a}</p>
        ))}
      </div>

      <div className="selected-div">
        <h4>Your answers</h4>
        {correctAnswers()}
      </div>
    </div>
  )
}
