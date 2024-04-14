import React from 'react';
import { useState } from 'react';
//FOR NAVIGATION
import { useHistory } from 'react-router-dom';
//ENCRYPT PASSWORD
//import { sha256 } from 'js-sha256';
import Form from './components/form/Form;

const SignIn = () => {

//empty strings to be set
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//INITIALIZE USE HISTORY FOR NAVIGATION
  const history = useHistory();

//update values
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    //ENCRYPT PASSWORD
    //const hashedPassword = sha256(password);

    const data = { username, password }; //if want encrypted password, password: hashedPassword

    try {
	//returns account data to account manager to log in account
      const response = await fetch('/accountManager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // SUCCESS -> go to main page
        history.push('/App');
      } else {
	//ERROR MESSAGE
        //console.error('Error:', response.statusText);
      }
    } catch (error) {
      //ERROR MESSAGE
      //console.error('Error:', error);
    }
  };

	const signInForm = {
		Elements: [
			{ Type: 'input', Name: 'username', Placeholder: 'Username', Value: username, OnChange: handleUsernameChange },
      			{ Type: 'password', Name: 'password', Placeholder: 'Password', Value: password, OnChange: handlePasswordChange }
    		],
    		Button: { Type: 'submit', Text: 'Sign In' }
  	};
	
  return (
    <div>
      <h2>Sign into an Account</h2>
	  //Form componente with signin for and submit button
      <Form {...signInForm} onSubmit={handleSubmit} />
      <p>Do you want to create an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

//REMEMBER ADD TO APP.JS
//	<Route exact path="/signup" component={SignUp} />
//OR LINK DOESNT WORK

export default SignIn;
