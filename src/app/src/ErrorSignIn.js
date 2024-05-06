import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/header/Header';

const ErrorSignIn = () => {
    return {
      <div>
          <Header />
          <h2>There was an error during the Sign In process</h2>
          <p><Link to="/App">Go back to main page</Link></p>
      </div>
    }
}

export default ErrorSignIn;
