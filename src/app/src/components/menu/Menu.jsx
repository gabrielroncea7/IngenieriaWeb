import InstructionsView from "../instructionView/InstructionView"
import './menu.css'
import UpperBarProfile from "../upperBarProfile/UpperBarProfile"

const Menu = ({instructionsHandlers, username}) => {
    return(
        <div className="menu">
            <InstructionsView handlers={instructionsHandlers}/>
            <UpperBarProfile username={username}/>
        </div>
    )
}

export default Menu