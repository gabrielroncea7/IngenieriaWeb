import React from 'react';
import "./Instructions.css";
import Button from '../button/Button';
//CREATE POP SUP WINDOWS
import Modal from 'react-modal';

const Instructions = ({ isOpen, onClose }) => {

  //returns text with instructions
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
      >

        <h2 className='header'>Game Instructions</h2>
        <div className='text'>
          <p>
            Try to guess the word in as few tries as possible!
          </p>
          <p>You have 6 tries:</p>
            <ol>
              <li>First try: 100 points</li>
              <li>Second try: 85 points</li>
              <li>Third try: 70 points</li>
              <li>Fourth try: 55 points</li>
              <li>Fifth try: 40 points</li>
              <li>Sixth try: 25 points</li>
            </ol>
            <p>Different block colors mean:</p>
            <ol>
              <li>Grey block: no letter tried in that block</li>
              <li>Red block: The letter doesn't appear in the word</li>
              <li>Yellow block: The letter appears in the word but is in the wrong position</li>
              <li>Green block: The letter appears in the word and is in the correct position</li>
            </ol>
          <p>Compete with your friends to get as many points as possible!</p>
        </div>
        <Button text="Close and Let's Play" onClick={onClose} />
      </Modal>
    </>
  );
  
};

export default Instructions;
