import axios from 'axios'

const signUp = (user) => {
    return axios
            .post('apiSignUp')
            .then(response => response.status == 200 ? true : false )
}

export default signUp