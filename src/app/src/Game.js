import React, { useState } from 'react';
import Instructions from './components/instructions/Instructions';
import Button from './components/button/Button';


const Game = () => {
  //controls INSTRUCTIONS pop up window
  const [isOpen, setIsOpen] = useState(false);
  const openIns = () => {
    setIsOpen(true);
  };
  const closeIns = () => {
    setIsOpen(false);
  };

  

  return(


    


    <Button text="Instructions" onClick={openIns} />
    <Instructions isOpen={isOpen} onClose={closeIns} />
  );
  
}

export default Game;
