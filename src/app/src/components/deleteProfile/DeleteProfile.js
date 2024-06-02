import { React, useState } from 'react';
import "./DeleteProfile.css";
import Button from '../button/Button';
import Message from '../message/Message';
//CREATE POP UP WINDOW
import Modal from 'react-modal';
//PROFILE API??
//import delete from '../services/profileServices';
import sessionServices from '../../services/sessionServices';
import profileServices from '../../services/profileServices';

const DeleteProfile = ({ isOpen, onClose }) => {

//sends signal to delete profile
  


  //GET/SET USERNAME
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  sessionServices.getUsername().then(name => setUsername(name))
  
  const handleSubmit = async (event) => {
    const response = await profileServices.deleteAccount(username, password)

    if(response.status == 200){
      //redireccionar a signup
    }
  };

  //returns text with warning about account deletion
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
      >

        <h2 className='header'>Warning!</h2>
        <div className='text'>
          <p>
            You are about to delete your profile!
          </p>
          <p>If you delete your profile, you won't be able to login using your credentials again, and all your data will be lost.</p>
        </div>
        <div>
          <p>Insert your password and click on the 'Delete Profile' button to delete your account forever.</p>
        </div>
        <label>Password</label>
        <input id='password-delete-input' onChange={(event) => setPassword(event.target.value)}/>
        <Button text="Delete Profile" onClick={handleSubmit} />
        <div>
          <p>If you don't want to delete your account, click on the 'Close Warning Window' button.</p>
        </div>
        <div>
          <Button text="Close Warning Window" onClick={onClose} />
          </div>
          {/*<Message message={message.message} color={message.color}/>*/}
      </Modal>
    </>
  );
  
};

export default DeleteProfile;
