import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/signin" element={<SignIn/>} />    
        </Routes>
        <Navigate from="/" to="/signup" />
      </Router>
    </>
  );
}

export default App;
