import { useState } from 'react'
import Categories from '../../categories.json'

export default function StartScreen(props) {
    const [category, setCategory] = useState(9)
    const [difficulty, setDifficulty] = useState("")
    const [numberOfQs, setNumberOfQs] = useState(5)

    let categoriesArr = Categories.map(cat => {
        return (<option key={cat.id} value={cat.id}>{cat.name}</option>)
    })

    function handleCategory(event) {
        setCategory(event.target.value)
    }

    function handleDifficulty(event) {
        setDifficulty(event.target.value)
    }

    function handleQsNumber(event) {
        setNumberOfQs(event.target.value)
    }
    return (
        <div id="start-screen-div">
            <h1>Set up your quiz!</h1>
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

            <button className="btn btn-success" onClick={() => props.handleFetch(numberOfQs, category, difficulty)}>Start quiz</button>
        </div>
    )
}