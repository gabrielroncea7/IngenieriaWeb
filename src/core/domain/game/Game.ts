import { Attempt } from "../attempt/Attempt";

export interface IGame{
    attempts: [
        {
            order: number,
            word: [
                {
                    value: String
                    color: String
                }
            ]
        }
    ],
    date: Date,
    points: number
}

export class Game {
    private _attempts: Array<Attempt>
    private _date: Date
    private _points: Number

    constructor(
        readonly attempts: Array<Attempt>,
        readonly date: Date,
        readonly points: number
    ){
        this._attempts = [...attempts]
        this._date = date
        this._points = points
    }
    static jsonConstructor(game: IGame): Game{
        let attemtps: Array<Attempt> = []

        game.attempts.forEach(a => {
            attemtps.push(Attempt.jsonConstructor(a))
        });

        return new Game(attemtps, game.date, game.points)
    }
    static create(
        attempts: Array<Attempt>,
        date: Date,
        points: number
    ): Game | null
    {
        if(Number.isInteger(points) && points >= -1){
            return new Game(attempts, date, points)
        }
        else{
            return null
        }
    }
    static jsonCreate(game: IGame): Game | null {
        if(Number.isInteger(game.points) && game.points >= -1){
            let attemtps: Array<Attempt> = []

            game.attempts.forEach(a => {
                const attempt = Attempt.jsonConstructor(a)

                if(attempt === null){
                    return null
                }

                attemtps.push(attempt)
            });
            return new Game(attemtps, game.date, game.points)
        }
        else{
            return null
        }
    }
    getAttempts(): Array<Attempt>{
        return this._attempts
    }
    setAttempts(attempts: Array<Attempt>): boolean{
        this._attempts = [...attempts]
        return true
    }
    getDate(): Date{
        return this._date
    }
    setDate(date: Date): boolean{
        this._date = date
        return true
    }
    getPoints() : Number{
        return this._points
    }
    setPoints(points: number): boolean{
        if(Number.isInteger(points) && points >= -1){
            this._points = points
            return true
        }
        else{
            return false
        }
    }
    toJson(): IGame{
        return JSON.parse(
            `{attempts: [${this._attempts.forEach(
                element => `${element.toJson()}, `
            )}], date: ${this._date}, points: ${this._points}}`)
    }
}