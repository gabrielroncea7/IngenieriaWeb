import axios from "axios";

const getUsername = () =>{
    return axios
        .get('http://localhost:4000/api/session')
        .then(res => res.data.username)
}

export default { getUsername }
