interface ILetter{
    value: String
    color: String
}

export class Letter {
    constructor(
        private value: String,
        private color: String
    ){}

    static jsonConstructor(
        letter: ILetter
    ): Letter{
        return new Letter(letter.value, letter.color)
    }

    static create(value: String, color: String): Letter | null{
        if(value.length == 1 && value.toLowerCase().match(/[a-z]/i) &&
            (
                color.toLowerCase() === 'red' ||
                color.toLowerCase() === 'yellow' ||
                color.toLowerCase() === 'green'
            )){
            return new Letter(value, color.toLowerCase())
        }
        else{
            return null
        }
    }
    
    static jsonCreate(letter: ILetter): Letter | null{
        if(letter.value.length == 1 && letter.value.toLowerCase().match(/[a-z]/i) &&
            (
                letter.color.toLowerCase() === 'red' ||
                letter.color.toLowerCase() === 'yellow' ||
                letter.color.toLowerCase() === 'green'
            )){
            return new Letter(letter.value, letter.color.toLowerCase())
        }
        else{
            return null
        }
    }
    getValue(): String{
        return this.value
    }
    getColor(): String{
        return this.color
    }
    setValue(value: String): Boolean{
        if(value.length == 1 && value.toLowerCase().match(/[a-z]/i)){
            this.value = value
            return true
        }
        return false
    }
    setColor(color: String ): Boolean{
        if(
            color.toLowerCase() === 'red' ||
            color.toLowerCase() === 'yellow' ||
            color.toLowerCase() === 'green'
        ){
            this.color = color
            return true
        }
        else{
            return false
        }
    }
    toJson(): ILetter{
        return JSON.parse(`{value: ${this.value}, color: ${this.color}}`)
    }
}