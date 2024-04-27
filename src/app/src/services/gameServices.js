import axios from 'axios'

const sendWord = (word, attemps) => {
    if(attemps <= 6){
        let strWord = ''

        word.forEach(element => {
            strWord = strWord + element.value
        });

        return axios
                .post('http://localhost:4000/api/game', strWord)
                .then(response => response.data)
    }
    else{
        return {message: "too many attemps"}
    }
}

const getSize = () =>{
    return axios
            .get('http://localhost:4000/api/game')
            .then(response => response.data)
}

export default { sendWord, getSize }