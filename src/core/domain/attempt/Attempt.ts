import { Letter } from "../letter/Letter";

interface IAttempt{
    word: [
        {
            value: String
            color: String
        }
    ]
}

export class Attempt{
    private _order: Number
    private _word: Array<Letter>

    constructor(
        readonly order: number,
        readonly word: Array<Letter>)
    {
        this._order = order
        this._word = word
    }
    static jsonConstructor(
        attempt: IAttempt,
        order: number): Attempt
    {
        let word:Array<Letter> = []

        attempt.word.forEach(element => 
            word.push(Letter.jsonConstructor(element))  
        );

        return new Attempt(order, word)
    }
    static create(
        order: number,
        word: Array<Letter>): Attempt | null
    {
        if(
            Number.isInteger(order) &&
            order >= 1 &&
            order <= 6)
        {
            return new Attempt(order, word)
        }
        else{
            return null
        }
    }
    static jsonCreate(
        attempt: IAttempt,
        order: number): Attempt | null
    {
        if(
            Number.isInteger(order) &&
            order >= 1 &&
            order <= 6)
        {
            let word: Array<Letter> = []

            let succeed: Boolean = true

            for(let i = 0 ; i < attempt.word.length ; i++){
                let letter: Letter | null = Letter.jsonCreate(attempt.word[i])

                if(letter == null){
                    succeed = false
                    break
                }
                else{
                    word.push(letter)
                }
            }

            return succeed ? new Attempt(order, word) : null
        }
        else{
            return null
        }
    }
    getOrder(): Number{
        return this._order
    }
    getWord(): Array<Letter>{
        return this._word
    }
    setOrder(order: number): Boolean{
        if(
            Number.isInteger(order) &&
            order >= 1 &&
            order <= 6)
        {
            this._order = order
            return true
        }
        else{
            return false
        }
    }
    setWord(word: Array<Letter>){
        this._word = word
    }
    toJson(): IAttempt{
        return JSON.parse(
            `{"word":"[${
                this._word.forEach(
                    element => `${element.toJson()},`
                )}]"}`)
    }
}