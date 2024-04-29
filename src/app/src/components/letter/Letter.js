// Component where you introduce a letter
// Gets color: red, yellow, green
// If no color: gray

import React from 'react';
import "./Letter.css";

function Letter({letter, index, onChange}) {
  //get letter and color of letter from sent props
  const { value, color } = letter;

  // check color to know how to color the block
  // if red,yellow,green = color
  // else = gray
  const backgroundColor = color === 'red' ? 'redLetter' : color === 'yellow' ? 'yellowLetter' : color === 'green' ? 'greenLetter' : 'grayLetter';

  if(backgroundColor === 'grayLetter'){

    return (
      <>
        <input type='text' maxLength='1' className='grayLetter' onChange={event => onChange(event, index)}/>
      </>
    )
  }
  else{
    return (
      <>
        <input type='text' maxLength='1' className={backgroundColor} readOnly value={value}/>
      </>
    )
  }
}

export default Letter;
