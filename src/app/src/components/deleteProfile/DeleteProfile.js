import { React, useState } from 'react';
import "./DeleteProfile.css";
import Button from '../button/Button';
import Message from '../message/Message';
//CREATE POP UP WINDOW
import Modal from 'react-modal';
//PROFILE API??
//import delete from '../services/profileServices';
import sessionServices from '../../services/sessionServices';

const DeleteProfile = ({ isOpen, onClose }) => {

//sends signal to delete profile
  const handleSubmit = async (event) => {
    	//const data = {username};
    //supongo que la API se llamara profileServices, tipo accountServices y gameServices
      //const response = profileServices
      //HE PUESTO USERNAME PORQUE POR AHORA NO PUEDO SACAR ID
      //.delete(username)
      //.then(res => res)
      //if(res.true){  
        //setMessage({
          //message: `The account has been deleted`,
          //color: 'green'
        //})
      //}
    };


  //GET/SET USERNAME
  const [username, setUsername] = useState('')
  sessionServices.getUsername().then(name => setUsername(name))
  
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
          <p>Click on the 'Delete Profile' button to delete your account forever.</p>
        </div>
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
