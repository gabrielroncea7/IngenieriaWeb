import React from 'react';
import "./Instructions.css";
import Button from '../button/Button';
//CREATE POP SUP WINDOWS
import Modal from 'react-modal';

function Instructions = ({ isOpen, onClose }) => {

  //returns text with instructions
  return (
    <!-- open and close the window with the instructions-->
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
    <div>
      <h2>Game Instructions</h2>
      <p>
        Try to guess the word in as few tries as possible!<br>
        You have 6 tries:<br>
        <ol>
          <li>First try: 100 points</li>
          <li>Second try: 85 points</li>
          <li>Third try: 70 points</li>
          <li>Fourth try: 55 points</li>
          <li>Fifth try: 40 points</li>
          <li>Sixth try: 25 points</li>
        </ol>
        <br>
        Different block colors mean:<br>
        <ol>
          <li>Grey block: no letter tried in that block</li>
          <li>Red block: The letter doesn't appear in the word</li>
          <li>Yellow block: The letter appears in the word but is in the wrong position</li>
          <li>Green block: The letter appears in the word and is in the correct position</li>
        </ol>
      </p>
      <p>Compete with your friends to get as many points as possible!</p>
      <Button text="Close instructions and go back to Game" onClick={onClose} />
    </div>
    </Modal>
  );
  
};

export default Instructions;
