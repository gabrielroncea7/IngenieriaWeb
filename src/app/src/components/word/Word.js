import React from 'react';
import Letter from '../letter/Letter';
import "./Word.css";


function Word(props) {
//gets the full word and size of word
  const { word } = props;

  return (
    <>
      {word.map((letter, i) => <Letter letter={letter} key={'letter' + i}/>)}
    </>
  );
}

export default Word;
