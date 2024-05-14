import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header/Header';

const LogOut = () => {

  return (
    <div>
      <Header />
      <h2>Logged out succesfully</h2>
      <p>Go back to <Link to="/signup">Main Page</Link> to Sign Up or Sign In</p>
    </div>
  );
};

export default LogOut
