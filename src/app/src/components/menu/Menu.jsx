import InstructionsView from "../instructionView/InstructionView"
import './menu.css'
import UpperBarProfile from "../upperBarProfile/UpperBarProfile"
const Menu = ({instructionsHandlers}) => {
    return(
        <div className="menu">
            <InstructionsView handlers={instructionsHandlers}/>
            
        </div>
    )
}

export default Menu