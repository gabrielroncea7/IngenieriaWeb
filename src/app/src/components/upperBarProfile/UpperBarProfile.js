import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//imported user icon
import { FaUser } from "react-icons/fa";

const UpperBarProfile = () => {

//LLAMAR A LA API DE SESION Y SACAR EL USERNAME
  
  // sets variable username to be used as the found name in the cookie
  const [username, setUsername] = useState('');
  //take username and check if longer than 6 chars
    setUsername(user.username);
    const str = {username}
    const len = str.length;
    if (len > 6) {
      //if username is longer than 6 letters, cut the username and put '...'
      const aux = '${user.username.substring(0,5)}...'
      setUsername(aux);
    }
  
  return{
    <div>
      <p><Link to="/logout">Sign Out</Link></p>
      <p><Link to="/profile">{username} <FaUser /> </Link></p>
    </div>
  }
}

export default UpperBarProfile;
