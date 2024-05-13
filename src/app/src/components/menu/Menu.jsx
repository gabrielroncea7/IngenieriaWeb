import InstructionsView from "../instructionView/InstructionView"
import ''
import UpperBarProfile from "../upperBarProfile/UpperBarProfile"
const Menu = ({instructionsHandlers}) => {
    return(
        <div className="menu">
            <InstructionsView handlers={instructionsHandlers}/>
            <UpperBarProfile/>
        </div>
    )
}

export default Menu