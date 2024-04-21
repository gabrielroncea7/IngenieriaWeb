// Component where you introduce a letter
// Gets color: red, yellow, green
// If no color: gray

import React from 'react';
import "./Letter.css";

function Letter(props) {
  //get letter and color of letter from sent props
  const { letter, color } = props;

  // check color to know how to color the block
  // if red,yellow,green = color
  // else = gray
  const backgroundColor = color === 'red' ? 'redLetter' : color === 'yellow' ? 'yellowLetter' : color === 'green' ? 'greenLetter' : 'grayLetter';

  const readonly = color === 'red' || color === 'yellow' || color === 'green'

  return (
    <>
      <input type='text' maxlength='1' className={backgroundColor} readOnly={readonly}/>
    </>
  );
}

export default Letter;
