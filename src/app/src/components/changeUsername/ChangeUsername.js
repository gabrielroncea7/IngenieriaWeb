import React from 'react';
import "./ChangeUsername.css";
import Button from '../button/Button';
import Form from '../form/Form';
import Message from './components/message/Message';
//CREATE POP UP WINDOW
import Modal from 'react-modal';

const ChangeUsername = ({ isOpen, onClose }) => {

  const [username, setUsername] = useState('');
  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSubmit = async (event) => {
  //avoid empty form (no data to create account)
    	event.preventDefault();

    	const data = {username};
    //supongo que la API se llamara profile, tipo signIn y gameServices
      const response = profile
      .delete(username)
      .then(res => res)
      if(res.true){  
        setMessage({
          message: `The account has been deleted`,
          color: 'green'
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
