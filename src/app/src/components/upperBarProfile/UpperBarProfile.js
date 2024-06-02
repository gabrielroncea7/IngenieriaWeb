import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//imported user icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import sessionServices from '../../services/sessionServices';

const UpperBarProfile = () => {

//GET/SET USERNAME
  const [username, setUsername] = useState('')
  sessionServices.getUsername().then(name => setUsername(name))
  
  //take username and check if longer than 6 chars
    const str = {username}
    const len = str.length;
    if (len > 6) {
      //if username is longer than 6 letters, cut the username and put '...'
      const aux = '${user.username.substring(0,5)}...'
      setUsername(aux);
    }
    
    const icon = <FontAwesomeIcon icon={faCircleUser} />
  
  return(
    <div>
      <p><Link to="/logout">Sign Out</Link></p>
      <p><Link to="/profile">{username} {icon} </Link></p>
    </div>
  );
}

export default UpperBarProfile;
