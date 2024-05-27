import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import LogOut from './LogOut';
import Game from './Game';
import Profile from './Profile';
import ErrorSignIn from './ErrorSignIn';
import ErrorSignUp from './ErrorSignUp';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Navigate to="/signup" replace/>}/>
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/signin" element={<SignIn/>} />
          <Route exact path="/game" element={<Game/>} />
          <Route exact path="/logout" element={<LogOut/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route exact path="/errorsignin" element={<ErrorSignIn/>} />
          <Route exact path="/errorsignup" element={<ErrorSignUp/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
