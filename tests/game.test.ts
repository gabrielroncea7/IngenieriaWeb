import axios from "axios";
import WordDAO from "../src/core/model/wordDAO/wordDAO";

describe('Game Integration Tests', () => {
    it('Get test', async () => {
        const max = 10
        const min = 5
        axios
            .get('http://localhost:4000/api/game')
            .then(response => {
                expect(response.data.length).toBeGreaterThanOrEqual(min)
                expect(response.data.length).toBeLessThanOrEqual(max)
            })
    })
    it('Random word', async () => {
        const user = "testUser"
        const word = "HOLAQ"
        const req = {
            word: word,
            user: user
        }
        axios
            .post('http://localhost:4000/api/game', req)
            .then(response => {
                for(let i = 0 ; i < word.length ; i++){
                    expect(response.data.wordChecked[i].letter).toBe(word[i])
                    expect(response.data.wordChecked[i]).toHaveProperty('color', ['green', 'yellow', 'red'])
                }
                expect(response.data).toHaveProperty('win', [true, false])
                expect(response.data).toHaveProperty('points', [-1, 25, 40, 55, 70, 85, 100])
                return response
            })
    })
    it('Correct word', async () => {
        const user = "testUser"
        const word = WordDAO.find().get
        const req = {
            word: word,
            user: user
        }
        axios
            .post('http://localhost:4000/api/game', req)
            .then(response => {
                for(let i = 0 ; i < word.length ; i++){
                    expect(response.data.wordChecked[i].letter).toBe(word[i])
                    expect(response.data.wordChecked[i]).toHaveProperty('color', ['green'])
                }
                expect(response.data).toHaveProperty('win', [true])
                expect(response.data).toHaveProperty('points', [25, 40, 55, 70, 85, 100])
                return response
            })
    })
})