import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './components/header/Header';
import './index.css'

const Profile = () => {
  // sets variable username to be used as the found name in the cookie
  const [username, setUsername] = useState('');

  useEffect(() => {
    // gets user from the global cookie to access the saved username
    const user = Cookies.getJSON('user');
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  return {
      <div>
      	<Header />
      	<h2>My Profile</h2>
            <p>Your username is {username}</p>

  
            <!-- PONER ESTADISTICAS DE JUEGO -->
  
      	<div>
          <p><Link to="/game">Play Game</Link></p>
          <p><Link to="/logout">Log out</Link></p>
        </div>
      </div>
  );
};
  }
}

export default Profile;
