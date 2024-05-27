import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/header/Header';

const ErrorSignUp = () => {
    return (
      <div>
          <Header />
          <h2>There was an error during the Sign Up process</h2>
          <p><Link to="/App">Go back to main page</Link></p>
      </div>
    )
}

export default ErrorSignUp;
