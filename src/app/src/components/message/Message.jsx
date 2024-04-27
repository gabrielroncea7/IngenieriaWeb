import './message.css'

const Message = ({message, color}) => {
    return (
        <div className={color === 'red' ? 'error' : color === 'green' ? 'success' : ''}>
            {message}
        </div>
    )
}

export default Message