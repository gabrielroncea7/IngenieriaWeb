import React from 'react';
import "./DeleteProfile.css";
import Button from '../button/Button';
//CREATE POP UP WINDOW
import Modal from 'react-modal';

const DeleteProfile = ({ isOpen, onClose }) => {

  //LLAMAR A LA API DE BORRAR PERFIL

  
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
        <Button text="Delete Profile" onClick={/* ACCION DE BORRAR PERFIL */} />
        <div>
          <p>If you don't want to delete your account, click on the 'Close Warning Window' button.</p>
        </div>
          <Button text="Close Warning Window" onClick={onClose} />
      </Modal>
    </>
  );
  
};

export default DeleteProfile;
