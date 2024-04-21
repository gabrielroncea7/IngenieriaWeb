import Word from "../word/Word"
import './WordAttempt.css'

const WordAttempts = (attempts, size) => {
    return (
        <div className="wordAttempts">
            {attempts.map((word, i) => <Word key={'attempt' + i} word={word} size={size}/>)}
        </div>
    )
}

export default WordAttempts