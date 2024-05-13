import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookie} from 'react-cookie'; //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
import Header from './components/header/Header';
import Button from './components/button/Button';
import DeleteProfile from './components/deleteProfile/DeleteProfile';
import ChangeUsername from './components/changeUsername/ChangeUsername';
import './index.css'


const Profile = () => {
//controls the profile deletion pop up confirmation window
  const [isOpenDel, setIsOpenDel] = useState(false);
  const openDel = () => {
    setIsOpenDel(true);
  };
  const closeDel = () => {
    setIsOpenDel(false);
  };
//controls the change username pop up window
  const [isOpenCha, setIsOpenCha] = useState(false);
  const openCha = () => {
    setIsOpenCha(true);
  };
  const closeCha = () => {
    setIsOpenCha(false);
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

  return (
      <div>
      	<Header />
      	<h2>My Profile</h2>
        <div>
          <p>Your username is {username}</p>
          <Button text="Change Username" onClick={openCha} />
          <ChangeUsername isOpen={isOpenCha} onClose={closeCha} />
        </div>  
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
}

export default Profile;
