import axios from 'axios'

const baseUrl = 'http://localhost:4000'

const signUp = (user) => {
    return axios
            .post(`${baseUrl}/api/signup`,user)
            .then(response => response.status == 200 ? true : false )
}

const signIn = (user) => {
    return axios
            .post(`${baseUrl}/api/login`, user)
            .then(response => response)
}

const logOut = (username) => {
    return axios
            .delete(`${baseUrl}/api/logout/?username=${username}`)
            .then(response => response)
}

export default { signUp, signIn, logOut}