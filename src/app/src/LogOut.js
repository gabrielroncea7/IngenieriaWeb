import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header/Header';

const LogOut = () => {
//invalidates cookie to force logout -> makes cookie expire by setting an expiration date in the past and deleting token
document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  return (
    <div>
      <Header>
      <h2>Logged out succesfully</h2>
      <p>Go back to <Link to="/signup">Main Page</Link> to Sign Up or Sign In</p>
    </div>
  );
};


export default LogOut
