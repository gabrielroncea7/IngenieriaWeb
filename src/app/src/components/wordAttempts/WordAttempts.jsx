import Word from "../word/Word"
import './WordAttempt.css'

const WordAttempts = (attempts) => {
    return (
        <div className="wordAttempts">
            {attempts.map((word, i) => <Word key={'attempt' + i} word={word}/>)}
        </div>
    )
}

export default WordAttempts