import Word from "../word/Word"
import './WordAttempt.css'

const WordAttempts = ({attempts, onChange}) => {
    return (
        <div className='wordAttempts'>
            {attempts.map((word, i) => <div key={'attempt' + i}><Word key={'attempt' + i} word={word} onChange={onChange}/></div>)}
        </div>
    )
}

export default WordAttempts