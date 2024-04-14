import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';


function App() {
  return (
    <>
      Wordle
    </>

//ROUTES HERE
  <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
    //First  page that shows when user enters site is sign up page to create an account
        <Redirect from="/" to="/signup" />
//MORE ROUTES HERE
    
      </Switch>
    </Router>
  );
}

export default App;
