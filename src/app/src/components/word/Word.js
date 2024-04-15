import React from 'react';
import Letter from '../letter/Letter';


function Word(props) {
//gets the full word and size of word
  const { word, size } = props;

  // USES LETTERS TO RENDER FULL WORD
  // uses 'split' to divide the word into an array of letters
  // uses 'map' to iterate over the array of letters and make a Letter component for each letter of word
  const renderLetters = () => {
    return word.split('').map((letter, index) => (
  // RENDERS LETTER BY LETTER
      <Letter key={index} letter={letter} color={color} />
    ));
  };

  return (
    <div>
      <!-- // dix style= {{ fontSize: 'x px', fontWeight: 'bold' }} to make bigger letters -->
      {renderLetters()}
    </div>
  );
}

export default Word;
