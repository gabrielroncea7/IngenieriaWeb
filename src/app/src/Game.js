import React, { useState } from 'react';
import Instructions from './components/instructions/Instructions';
import Button from './components/button/Button';
import WordAttempts from './components/wordAttempts/WordAttempts';
import './index.css'
import GameService from './services/gameServices'
import gameServices from './services/gameServices';
import Header from './components/header/Header';


const Game = () => {
  //controls INSTRUCTIONS pop up window
  const wordSize = 3//GameService.getSize()

  const [isOpen, setIsOpen] = useState(false);
  const openIns = () => {
    setIsOpen(true);
  };
  const closeIns = () => {
    setIsOpen(false);
  };

  const generateEmptyWord = (size) => {
    let word = []
    for (let i = 0 ; i < size ; i++){
      word.push({
                  color: 'gray',
                  value: ''}
                )
    }
    return word
  }

  const emptyWord = generateEmptyWord(wordSize)

  const [attempts, setAttemps] = useState([[...emptyWord]])
  const [currentWord, setCurrentWord] = useState([...emptyWord])

  const sendHandler = (event) => {

    event.preventDefault()

    let newAttempt = [...attempts]
    newAttempt.pop()
    //const wordChecked = gameServices.sendWord(currentWord)
    //newAttempt.push(wordChecked)
    newAttempt.push([
      {
        color: 'red',
        value: 'A'
      },
      {
        color: 'red',
        value: 'A'
      },
      {
        color: 'red',
        value: 'A'
      }
    ])
    
    /*if(wordChecked.win){
      //Case user win
      setAttemps(newAttempt)
      setCurrentWord([])
    }
    else */if(attempts.length == 6){
      setAttemps(newAttempt)
      setCurrentWord([])
    }
    else{
      newAttempt.push([...emptyWord])
      setAttemps(newAttempt)
      setCurrentWord([...emptyWord])
    }

    console.log(newAttempt)
  }


  const changeWordHandler = (event, index) => {
    event.preventDefault()
    let newCurrent = [...currentWord]
    newCurrent[index] = event.target.value

    setCurrentWord(newCurrent)
  }

  return(
    <>
      <Header />
      <Button text="Instructions" onClick={openIns} />
      <Instructions isOpen={isOpen} onClose={closeIns} />
      <WordAttempts attempts={attempts} onChange={changeWordHandler}/>
      <div className='center'>
        <Button text="Send Word" onClick={sendHandler}/>
      </div>
    </>
  );
  
}

export default Game;
