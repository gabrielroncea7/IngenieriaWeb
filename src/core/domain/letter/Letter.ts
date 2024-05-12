interface ILetter{
    value: String
    color: String
}

export class Letter {
    private _value: String;
    private _color: String;
    constructor(
        readonly value: String,
        readonly color: String
    ){
        this._value = value
        this._color = color
    }

    static jsonConstructor(
        letter: ILetter
    ): Letter{
        return new Letter(letter.value, letter.color)
    }

    static create(value: String, color: String): Letter | null{
        if(value.length == 1 &&
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
        if(letter.value.length == 1 &&
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
        return this._value
    }
    getColor(): String{
        return this._color
    }
    setValue(value: String): Boolean{
        if(value.length == 1){
            this._value = value
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
            this._color = color
            return true
        }
        else{
            return false
        }
    }
    toJson(): ILetter{
        return JSON.parse(`{value: ${this._value}, color: ${this._color}}`)
    }
}