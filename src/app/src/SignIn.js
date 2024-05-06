import React from 'react';
import { useState } from 'react';
//FOR STORING USERNAME, FOR PROFILE
import Cookies from 'js-cookie'; //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
//FOR NAVIGATION
import { useNavigate, Link } from 'react-router-dom';
//FOR ENCRYPTION OF PASSWORD
import { sha256 } from 'js-sha256';
import Form from './components/form/Form';
import signIn from './services/accountServices'
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

    const data = { username, password: hashedPassword };

    signIn(data)
      .then(response => {
        if (response.status == 200) {
	  // get username from signin form
	  const user = { username: username }; //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
    	  // store username in cookies to use in profile
    	  Cookies.set('user', user); //BORRAR CUANDO ESTÉ USABLE LA PROFILE API
	  // SUCCESS -> go to main page
          history.push('/App');
        } else {
          //ERROR MESSAGE
          history.push('/ErrorSignIn');
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
    </div>
  );
};

export default SignIn;
