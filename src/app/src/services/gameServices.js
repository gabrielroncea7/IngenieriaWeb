import axios from 'axios'
const sendWord = (word, attemps) => {
    if(attemps <= 6){
        return axios
                .post('apicheck', word)
                .then(response => response.data)
    }
    else{
        return {message: "too many attemps"}
    }
}

const getPoints = (attemps) =>{
    if(attemps < 1 || attemps > 6){
        return {message: "attemps error"}
    }
    else{
        return 100 - (15 * (attemps - 1))
    }
}

const getSize = () =>{
    return axios
            .get('wordsizeendpoint')
            .then(response => response.data)
}

export default { sendWord, getPoints }