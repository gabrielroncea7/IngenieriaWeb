import axios from 'axios'

const sendWord = (word, attempts, username) => {
    if(attempts <= 6){
        let strWord = ''

        word.forEach(element => {
            strWord = strWord + element.value
        });

        return axios
                .post('http://localhost:4000/api/game', {
                    params:{
                        word: strWord,
                        username: username
                    }
                })
                .then(response => response.data)
    }
    else{
        return {message:'too many attempts'}
    }
}

const getSize = (username) =>{
    return axios
            .get('http://localhost:4000/api/game',{
                params:{
                    username: username
                }
            })
            .then(response => response.data)
}

export default { sendWord, getSize }