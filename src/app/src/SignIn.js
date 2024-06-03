import React from 'react';
import { useState } from 'react';
//FOR NAVIGATION
import { useNavigate, Link } from 'react-router-dom';
//FOR ENCRYPTION OF PASSWORD
import { sha256 } from 'js-sha256';
import Form from './components/form/Form';
import accountServices from './services/accountServices'
import Header from './components/header/Header';

const SignIn = () => {


//empty strings to be set
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//INITIALIZE USE HISTORY FOR NAVIGATION
  const history = useNavigate();

//update values
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    //ENCRYPT PASSWORD
    const hashedPassword = sha256(password);

    const data = { username: username, password: hashedPassword };

    accountServices.signIn(data)
      .then(response => {
        if (response.status == 200) {
	  // get username from signin form
	        const user = { username: username };
          history('/game');
        } else {
	  //ERROR IN SIGNIN
          history('/errorsignin');
        }
      })
  };

	const signInForm = {
		elements: [
			{ type: 'input', name: 'username', placeholder: 'Username', value: username, onchange: handleUsernameChange },
      			{ type: 'password', name: 'password', placeholder: 'Password', value: password, onchange: handlePasswordChange }
    		],
    		button: { type: 'submit', text: 'Sign In' }
  	};
	
  return (
    <div>
	<Header />
	<h2>Sign into an Account</h2>
	<Form {...signInForm} onSubmit={handleSubmit} />
	<p>Do you want to create an account? <Link to="/signup">Sign Up</Link></p>
	
	<div>
		<p>Go play? <Link to="/game">Play</Link></p>
	</div>
    </div>
  );
};

export default SignIn;
