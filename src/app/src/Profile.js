import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/header/Header';
import Button from './components/button/Button';
import DeleteProfile from './components/deleteProfile/DeleteProfile';
import ChangeUsername from './components/changeUsername/ChangeUsername';
// import sessionServices from './services/sessionServices'; // Comentado
// import profileServices from './services/profileServices'; // Comentado
import './index.css';

const Profile = () => {
  // controls the profile deletion pop up confirmation window
  const [isOpenDel, setIsOpenDel] = useState(false);
  const openDel = () => setIsOpenDel(true);
  const closeDel = () => setIsOpenDel(false);

  // controls the change username pop up window
  const [isOpenCha, setIsOpenCha] = useState(false);
  const openCha = () => setIsOpenCha(true);
  const closeCha = () => setIsOpenCha(false);

  const navigate = useNavigate();

  // Hardcoded user data for demo purposes
  const [email, setEmail] = useState('demo@example.com');
  const [games, setGames] = useState(10);
  const [wins, setWins] = useState(5);
  const [points, setPoints] = useState(100);

  // HANDLE LOG OUT
  const handleLogOut = () => navigate('/logout');

  // Hardcoded username for demo purposes
  const [username, setUsername] = useState('DemoUser');

  return (
    <div>
      <Header />
      <h2>My Profile</h2>
      <div>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <Button text="Change Username" onClick={openCha} />
        <ChangeUsername isOpen={isOpenCha} onClose={closeCha} />
      </div>  
      <div>
        <p>Total games played: {games}</p>
        <p>Total wins: {wins}</p>
        <p>Points: {points}</p>
        <p><Link to="/game">Let's play the Game!</Link></p>
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
