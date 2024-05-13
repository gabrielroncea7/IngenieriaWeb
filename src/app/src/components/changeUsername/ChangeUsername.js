import React from 'react';
import "./ChangeUsername.css";
import Button from '../button/Button';
import Form from '../form/Form';
import Message from '../message/Message';
//CREATE POP UP WINDOW
import Modal from 'react-modal';
//PROFILE API??
import update from '../services/profileServices';

const ChangeUsername = ({ isOpen, onClose }) => {

  const [username, setUsername] = useState('');
  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSubmit = async (event) => {
  //avoid empty form (no data to delete account)
    	event.preventDefault();

      const user = profileServices
      //id??
      .get(id)
      then(res => res)
    //supongo que la API se llamara profileServices, tipo accountServices y gameServices
      const response = profileServices
      .update(user)
      .then(res => res)
      if(res.true){
        setMessage({
          message: `The account name has been changed`,
          color: 'green'
        })
      }
      else if(res.false){
        setMessage({
          message: 'There was an error and the account name is not changed',
          color: 'red'
        })
      }
    };

  const elements = [
    { type: 'input', name: 'username', placeholder: 'Username', value: username, onchange: handleUsernameChange },
  ];
  const button = { type: 'submit', text: 'Change Username' };
  
  //returns text
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
      >

        <h2 className='header'>New username</h2>
        <div className='text'>
          <p>Enter your new username and click on the 'Change Username' button to change your username.</p>
          <Form elements={elements} button={button} onSubmit={handleSubmit} />
        </div>
        <div>
          <p>If you don't want to change your username, click on the 'Close Window' button.</p>
        </div>
        <div>
          <Button text="Close Window" onClick={onClose} />
          </div>
          <Message message={message.message} color={message.color} />
      </Modal>
    </>
  );
  
};

export default ChangeUsername;
