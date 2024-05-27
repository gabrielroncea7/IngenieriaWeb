import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/header/Header';
import Button from './components/button/Button';
import DeleteProfile from './components/deleteProfile/DeleteProfile';
import ChangeUsername from './components/changeUsername/ChangeUsername';
import sessionServices from './services/sessionServices';
//suponiendo que la api para los porcentajes y puntos del usuario se llamará scoreServices
import scoreServices from './services/scoreServices';
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

  const history = useNavigate();
  
  const handleLogOut = //LLAMAR A API LOGOUT PARA BORRAR LA SESION
  {
   history.push('/LogOut'); 
  }

  //GET/SET USERNAME
  const [username, setUsername] = useState('')
  sessionServices.getUsername().then(name => setUsername(name))

  //GET/SET WIN PERCENTAGE
  const[percentage, setPerc] = useState('')
  scoreServices.getPercentage().then(percentage => setPerc(percentage))

  //GET/SET TOTAL SCORE
  const[totalscore, setTotal] = useState('')
  scoreServices.getTotal().then(totalscore => setTotal(totalscore))

  //GET/SET SCORE FOR THIS WEEK
  const[score, setScore] = useState('')
  scoreServices.getWeek().then(score => setScore(score))


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
          <p>Your total win % is {percentage}%</p>
          <p>Your total score is {totalscore}</p>
          <p>Your score this week is {score}</p>
          <p><Link to="/game">Play Game</Link></p>
        </div>
        <div>
          <Button text="Log Out" onClick={handleLogOut} />
          <Button text="Delete Profile" onClick={openDel} />
          <DeleteProfile isOpen={isOpenDel} onClose={closeDel} />
        </div>
      </div>
  );
}

export default Profile;
