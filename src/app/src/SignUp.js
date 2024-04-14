import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//ENCRYPT PASSWORD FROM VIEW
//import { sha256 } from 'js-sha256';


function SignUp() {
//empty strings to be set
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//update values
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
//avoid empty form (no data to create account)
  	event.preventDefault();
	
	//ENCRYPT PASSWORD
	//const hashedPassword = sha256(password);

  	const data = { username, email, password }; //if want encrypted password, password: hashedPassword
	try {
		//returns account data to account manager to create account
    		const response = await fetch('/accountManager', {
			method: 'POST',
      			headers: {
        			'Content-Type': 'application/json'
      			},
      			body: JSON.stringify(data)
    		});

    		if (response.ok) {
			//SUCCESS MESSAGE
      			//console.log('Data sent successfully');
    		} else {
			//ERROR MESSAGE
      			//console.error('Error:', response.statusText);
    		}
  	} catch (error) {
		//ERROR MESSAGE
    		//console.error('Error:', error);
  	}
  };


  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Do you already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
};

//REMEMBER ADD TO APP.JS
//	<Route exact path="/signin" component={SignIn} />
//OR LINK DOESNT WORK

export default SignUp;
