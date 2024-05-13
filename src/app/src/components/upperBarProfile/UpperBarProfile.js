import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
import { FaUser } from "react-icons/fa";

const UpperBarProfile = () => {

  // sets variable username to be used as the found name in the cookie
  const [username, setUsername] = useState(''); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API

  useEffect(() => { //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
    // gets user from the global cookie to access the saved username
    const user = Cookies.getJSON('user'); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
    if (user && user.username) { //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
      setUsername(user.username); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
    } //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
    const str = {username}
    const len = str.length;
    if (len > 6) {
      //if username is longer than 6 letters, cut the username and put '...'
      const aux = '${user.username.substring(0,6)}...'
      setUsername(username.substring(0,6));
    }
  }, []); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
  
  return{
    <div>
      <p><Link to="/logout">Sign Out</Link></p>
      <p><Link to="/profile">{username} <FaUser /> </Link></p>
    </div>
  }
}

export default UpperBarProfile;
