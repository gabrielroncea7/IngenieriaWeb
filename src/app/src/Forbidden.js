import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/header/Header';

const Forbidden = () => {
    return (
      <div>
          <Header />
          <h2>You have to Sign In to access this page</h2>
          <p><Link to="/signin">Go Sign In</Link></p>
      </div>
    )
}

export default Forbidden;
