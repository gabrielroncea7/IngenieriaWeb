import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Game from './Game';


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
        </Routes>
      </Router>
    </>
  );
}

export default App;
