import React, { useState } from 'react';
import Button from './components/button/Button';
import WordAttempts from './components/wordAttempts/WordAttempts';
import './index.css';
import Header from './components/header/Header';
import Message from './components/message/Message';
import Menu from './components/menu/Menu';

// Helper function to generate an empty word of a given size
const generateEmptyWord = (size) => {
  let word = [];
  for (let i = 0; i < size; i++) {
    word.push({
      color: 'gray',
      value: ''
    });
  }
  return word;
};

const Game = () => {
  // Hardcoded username for demo purposes
  const [username, setUsername] = useState('DemoUser');

  // Generate an empty word of fixed size 5
  const emptyWord = generateEmptyWord(5);

  const [attempts, setAttempts] = useState([[...emptyWord]]);
  const [currentWord, setCurrentWord] = useState([...emptyWord]);
  const [message, setMessage] = useState({ message: '', color: '' });

  // State for instructions popup
  const [isOpen, setIsOpen] = useState(false);
  const openIns = () => setIsOpen(true);
  const closeIns = () => setIsOpen(false);

  // Handler for send button click
  const sendHandler = (event) => {
    event.preventDefault();
    console.log('Send button clicked');
  };

  // Handler for changing word input
  const changeWordHandler = (event, index) => {
    event.preventDefault();
    let newCurrent = [...currentWord];
    newCurrent[index].value = event.target.value; // Update the value of the object
    setCurrentWord(newCurrent);
  };

  return (
    <>
      <Header />
      <Menu username={username} instructionsHandlers={{ isOpen: isOpen, onOpen: openIns, onClose: closeIns }} />
      <WordAttempts attempts={attempts} onChange={changeWordHandler} />
      <div className='center'>
        <Button text="Send Word" onClick={sendHandler} />
      </div>
      <Message message={message.message} color={message.color} />
    </>
  );
};

export default Game;
