import axios from 'axios'

const signUp = (user) => {
    return axios
            .post('apiSignUp',user)
            .then(response => response.status == 200 ? true : false )
}

const signIn = (user) => {
    return axios
            .post('apiLog', user)
            .then(response => response)
}

export default {signUp, signIn}