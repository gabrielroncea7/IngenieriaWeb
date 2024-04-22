import React, { useState } from 'react';
import Instructions from './components/instructions/Instructions';
import Button from './components/button/Button';
import WordAttempts from './components/wordAttempts/WordAttempts';
import './index.css'
import GameService from './services/gameServices'
import gameServices from './services/gameServices';


const Game = () => {
  //controls INSTRUCTIONS pop up window
  const wordSize = GameService.getSize()

  const [isOpen, setIsOpen] = useState(false);
  const openIns = () => {
    setIsOpen(true);
  };
  const closeIns = () => {
    setIsOpen(false);
  };

  const prueba = [
    [
      {
        color: 'red',
        value: 'A'
      },
      {
        color: 'gray',
        value: 'A'
      },
      {
        color: 'gray',
        value: 'A'
      }
    ],
    [
      {
        color: 'red',
        value: 'A'
      },
      {
        color: 'gray',
        value: 'A'
      },
      {
        color: 'gray',
        value: 'A'
      }
    ],
    [
      {
        color: 'gray',
        value: 'A'
      },
      {
        color: 'gray',
        value: 'A'
      },
      {
        color: 'gray',
        value: 'A'
      }
    ]
  ]

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

  const [attempts, setAttemps] = useState(generateEmptyWord(wordSize))
  const [currentWord, setCurrentWord] = useState(prueba[prueba.length - 1])

  const sendHandler = (event) => {
    event.preventDefault()
    let newAttempt = [...attempts]
    newAttempt.pop()
    const wordChecked = gameServices.sendWord(currentWord)
    newAttempt.push(wordChecked)
    
    if(wordChecked.win){
      //Case user win
      setAttemps(newAttempt)
      setCurrentWord([])
    }
    else{
      newAttempt.push(generateEmptyWord(wordSize))
      setCurrentWord(prueba[prueba.length - 1])
    }
  }

  const changeWordHandler = (event, index) => {
    event.preventDefault()
    let newCurrent = [...currentWord]
    newCurrent[index] = event.target.value

    setCurrentWord(newCurrent)
  }

  return(
    <>
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
