import { useState } from 'react'
import Categories from '../../categories.json'

export default function StartScreen(props) {
    const [quizSettings, setQuizSettings] = useState({
        category: 9,
        difficulty: "",
        numberOfQs: 5
    })

    let categoriesArr = Categories.map(cat => {
        return (<option key={cat.id} value={cat.id}>{cat.name}</option>)
    })

    function handleCategory(event) {
        setQuizSettings(prevState => ({...prevState, category: event.target.value}))
    }

    function handleDifficulty(event) {
        setQuizSettings(prevState => ({...prevState, category: event.target.value}))
    }

    function handleQsNumber(event) {
        setQuizSettings(prevState => ({...prevState, numberOfQs: event.target.value}))
    }

    return (
        <div id="start-screen-div">
            <h2>Set up your quiz!</h2>
            <label htmlFor="category" className="form-label">Select category</label><br />
            <select name="category" id="category" className="form-select" onChange={handleCategory}>
                {categoriesArr}
            </select>
            <br />

            <label htmlFor="difficulty" className="form-label">Select difficulty</label><br />
            <select name="difficulty" id="difficulty" className="form-select" onChange={handleDifficulty}> 
                <option value="">Any difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <br />

            <label htmlFor="number-of-qs" className="form-label">Number of questions</label><br />
            <input type="number" id="number-of-qs" defaultValue={5} min={1} className="form-control" onChange={handleQsNumber} />

            <button onClick={() => props.handleFetch(quizSettings.numberOfQs, quizSettings.category, quizSettings.difficulty)}
                className="btn btn-primary">Start quiz</button>
        </div>
    )
}
