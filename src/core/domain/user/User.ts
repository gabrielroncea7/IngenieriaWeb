// Importar la clase Email
import { Email } from '../email/Email';

interface IUser{
    id: string,
    username: string,
    email: string,
    password: string
    points: number
    wins: number,
    gamesPlayed: number
}

export class User {
    private _id: string;
    private _username: string;
    private _email: Email;
    private _password: string;
    private _points: number;
    private _wins: number;
    private _gamesPlayed: number;

    constructor(
        id: string,
        username: string,
        email: Email,
        password: string,
        points: number,
        wins: number,
        gamesPlayed: number
    ) {
        this._id = id;
        this._username = username;
        this._email = email;
        this._password = password;
        this._points = points;
        this._wins = wins;
        this._gamesPlayed = gamesPlayed;
    }
    static jsonConstructor(user: IUser): User | null{
        const email = Email.create(user.email)
        if(email === null){
            return null
        }
        else{
            return new User(
                user.id,
                user.username,
                email,
                user.password,
                user.points,
                user.wins,
                user.gamesPlayed
            )
        }
    }
    // Getters and setters
    getId(): string {
        return this._id;
    }

    setId(id: string): void {
        this._id = id;
    }

    getUsername(): string {
        return this._username;
    }

    setUsername(username: string): void {
        this._username = username;
    }

    getEmail(): string {
        return this._email.get();
    }

    setEmail(email: string): boolean{
        const newEmail = Email.create(email);
        if(newEmail === null){
            return false
        }
        else{
            this._email = newEmail
            return true
        }
    }

    getPassword(): string {
        return this._password;
    }

    setPassword(password: string): void {
        this._password = password;
    }

    getPoints(): number {
        return this._points;
    }

    setPoints(points: number): void {
        this._points = points;
    }

    getWins(): number {
        return this._wins;
    }

    setWins(wins: number): void {
        this._wins = wins;
    }

    getGamesPlayed(): number {
        return this._gamesPlayed;
    }

    setGamesPlayed(gamesPlayed: number): void {
        this._gamesPlayed = gamesPlayed;
    }

    toJson(): IUser{
        return JSON.parse(`{id: ${this._id}, username: ${this._username}, email: ${this._email.get()}, password: ${this._password}, points: ${this._points}, wins: ${this._wins}, gamesPlayed: ${this._gamesPlayed}}`)
    }
}
