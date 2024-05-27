import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './components/header/Header';

const Forbidden = () => {
    return (
      <div>
          <Header />
          <h2>You have to Sign Up to access this page</h2>
          <p><Link to="/signup">Go Sign Up</Link></p>
      </div>
    )
}

export default Forbidden;
