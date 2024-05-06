import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
import Header from './components/header/Header';
import './index.css'

const Profile = () => {
  // sets variable username to be used as the found name in the cookie
  const [username, setUsername] = useState(''); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API

  useEffect(() => { //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
    // gets user from the global cookie to access the saved username
    const user = Cookies.getJSON('user'); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
    if (user && user.username) { //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
      setUsername(user.username); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
    } //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
  }, []); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API

  return {
      <div>
      	<Header />
      	<h2>My Profile</h2>
            <p>Your username is {username}</p> <!-- BORRAR CUANDO ESTÉ USABLE LA PROFILE API -->

  
            <!-- PONER ESTADISTICAS DE JUEGO -->
  
      	<div>
          <p><Link to="/game">Play Game</Link></p>
          <p><Link to="/logout">Log out</Link></p>
        </div>
        <div>
          <p><Link to ="deleteprofile">Delete profile</Link></p>
        </div>
      </div>
  );
};
  }
}

export default Profile;
