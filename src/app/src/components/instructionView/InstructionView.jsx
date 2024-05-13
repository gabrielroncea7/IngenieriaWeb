import Instructions from "../instructions/Instructions"
import './instructionsView.css'

const InstructionsView = ({handlers}) => {
    return (
        <>
            <div className='button' onClick={handlers.onOpen}>Instructions</div>
            <Instructions isOpen={handlers.isOpen} onClose={handlers.onClose}/>
        </>
    )
}

export default InstructionsView