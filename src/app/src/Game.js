import React, { useState } from 'react';
import Button from './components/button/Button';
import WordAttempts from './components/wordAttempts/WordAttempts';
import './index.css'
import GameService from './services/gameServices'
import gameServices from './services/gameServices';
import Header from './components/header/Header';
import Message from './components/message/Message';
import Menu from './components/menu/Menu';
import sessionServices from './services/sessionServices';

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

const Game = async () => {
  //controls INSTRUCTIONS pop up window
  const [username, setUsername] = useState('')

  sessionServices.getUsername().then(name => setUsername(name))

  const res = await GameService.getSize(username)

  const emptyWord = generateEmptyWord(res.data.length)

  const [attempts, setAttemps] = useState([[...emptyWord]])
  const [currentWord, setCurrentWord] = useState([...emptyWord])
  const [message, setMessage] = useState({message: '', color: ''})

  const [isOpen, setIsOpen] = useState(false);
  const openIns = () => {
    setIsOpen(true);
  };
  const closeIns = () => {
    setIsOpen(false);
  };
  

  const sendHandler = (event) => {

    event.preventDefault()

    let newAttempt = [...attempts]
    newAttempt.pop()
    const response = gameServices
      .sendWord(currentWord, username)
      .then(res => res)

    newAttempt.push(response.wordChecked)
    
    if(response.win){
      //Case user win
      setAttemps(newAttempt)
      setCurrentWord([])

      setMessage({
        message: `Congratulations!!!. Score: ${response.points}`,
        color: 'green'
      })
    }
    else if(attempts.length == 6){
      setAttemps(newAttempt)
      setCurrentWord([])

      setMessage({
        message: `Sorry. Try it next day`,
        color: 'red'
      })
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
      <Menu username={username} instructionsHandlers={{isOpen: isOpen, onOpen: openIns, onClose: closeIns}}/>
      <WordAttempts attempts={attempts} onChange={changeWordHandler}/>
      <div className='center'>
        <Button text="Send Word" onClick={sendHandler}/>
      </div>
      <Message message={message.message} color={message.color}/>
    </>
  )
}

export default Game;
