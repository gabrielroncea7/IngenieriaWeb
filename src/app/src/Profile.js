import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
import Header from './components/header/Header';
import Button from './components/button/Button';
import DeleteProfile from './components/deleteProfile/DeleteProfile';
import ChangeUsername from './components/changeUsername/ChangeUsername';
import './index.css'


const Profile = () => {
//controls the profile deletion pop up confirmation window
  const [isOpenDel, setIsOpen] = useState(false);
  const openDel = () => {
    setIsOpen(true);
  };
  const closeDel = () => {
    setIsOpen(false);
  };
//controls the change username pop up window
  const [isOpenCha, setIsOpen] = useState(false);
  const openCha = () => {
    setIsOpen(true);
  };
  const closeCha = () => {
    setIsOpen(false);
  };



  
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
            <div>
              <p>Your username is {username}</p> <!-- MODIFICAR CUANDO ESTÉ USABLE LA PROFILE API -->
              <Button text="Change Username" onClick{openCha} />
              <ChangeUsername isOpen{isOpenCha} onClose{closeCha} />
            </div>
  
            <!-- PONER ESTADISTICAS DE JUEGO -->






  
      	<div>
          <p><Link to="/game">Play Game</Link></p>
          <p><Link to="/logout">Log out</Link></p>
        </div>
        <div>
          <Button text="Delete Profile" onClick={openDel} />
          <DeleteProfile isOpen={isOpenDel} onClose={closeDel} />
        </div>
      </div>
  );
};
  }
}

export default Profile;
