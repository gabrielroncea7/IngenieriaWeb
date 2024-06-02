import axios from 'axios'

const baseUrl = 'http://localhost:4000'

const getUserData = (user) => {
    return axios
            .get(`${baseUrl}/api/profile`,user)
            .then(response => response)
}

const deleteAccount = (username, password) => {
    return axios
            .delete(`${baseUrl}/api/signin/`, {username: username, password: password})
            .then(response => response)
}

export default { getUserData, deleteAccount}