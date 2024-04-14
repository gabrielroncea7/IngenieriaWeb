import { useState } from 'react';
//FOR NAVIGATION
import { useHistory } from 'react-router-dom';
//ENCRYPT PASSWORD
//import { sha256 } from 'js-sha256';

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

  return (
	<div>
	<h2>Sign into an Account</h2>
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" value={username} onChange={handleUsernameChange} />

      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />

      <button type="submit">Sign In</button>
    </form>
	<p>Do you want to create an account? <Link to="/signup">Sign Up</Link></p>
	</div>
  );
};

//REMEMBER ADD TO APP.JS
//	<Route exact path="/signup" component={SignUp} />
//OR LINK DOESNT WORK

export default SignIn;
