import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import LogOut from './LogOut';
import Game from './Game';
import Profile from './Profile';
import ErrorSignIn from './ErrorSignIn';
import ErrorSignUp from './ErrorSignUp';
import Forbidden from './Forbidden';
import sessionServices from './services/sessionServices';


function App() {
      const history = useNavigate();
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Navigate to="/signup" replace/>}/>
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/signin" element={<SignIn/>} />
          <Route exact path="/forbidden" element={<Forbidden/>} />
          {sessionServices.getUsername() ? <Route exact path="/game" element={<Game/>} /> : history.push(/forbidden) }
          {sessionServices.getUsername() ? <Route exact path="/logout" element={<LogOut/>} /> : history.push(/forbidden) }
          {sessionServices.getUsername() ? <Route exact path="/profile" element={<Profile/>} /> : history.push(/forbidden) }
          {sessionServices.getUsername() ? <Route exact path="/errorsignin" element={<ErrorSignIn/>} /> : history.push(/forbidden) }
          {sessionServices.getUsername() ? <Route exact path="/errorsignup" element={<ErrorSignUp/>} /> : history.push(/forbidden) }
        </Routes>
      </Router>
    </>
  );
}

export default App;
