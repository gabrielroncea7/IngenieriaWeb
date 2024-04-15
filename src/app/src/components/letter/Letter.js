// Component where you introduce a letter
// Gets color: red, yellow, green
// If no color: gray

import React from 'react';

function Letter(props) {
  //get letter and color of letter from sent props
  const { letter, color } = props;

  // check color to know how to color the block
  // if red,yellow,green = color
  // else = gray
  const backgroundColor = color === 'red' ? 'red' : color === 'yellow' ? 'yellow' : color === 'green' ? 'green' : 'gray';

  return (
	<!-- padding: 'x px', margin: 'x px' if needed -->
    <div style={{ backgroundColor, display: 'inline-block' }}>
      <!-- font size and bold letter? -->
      <!-- <span style={{ fontSize: '24px', fontWeight: 'bold' }}> -->
	{letter}
      <!-- </span> -->
    </div>
  );
}

export default Letter;
