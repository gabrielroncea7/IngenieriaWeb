import React, { useState } from 'react';
import Instructions from './components/instructions/Instructions';
import Button from './components/button/Button';
import WordAttempts from './components/wordAttempts/WordAttempts';
import Word from './components/word/Word';
import './index.css'


const Game = () => {
  //controls INSTRUCTIONS pop up window
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

  const [attempts, setAttemps] = useState(prueba)
  const [currentWord, setCurrentWord] = useState(prueba[prueba.length - 1])

  const sendHandler = (event) => {
    let newAttempt = [...attempts]
    newAttempt.pop()
    newAttempt.push(currentWord)
    newAttempt.push([
      {
        color: 'gray',
        value: ''
      },
      {
        color: 'gray',
        value: ''
      },
      {
        color: 'gray',
        value: ''
      }
    ])
    setAttemps(newAttempt)
    setCurrentWord(prueba[prueba.length - 1])
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
