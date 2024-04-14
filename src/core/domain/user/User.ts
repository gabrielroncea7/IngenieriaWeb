// Importar la clase Email
import { Email } from '../email/Email';

class User {
    private _id: number;
    private _username: string;
    private _email: Email;
    private _password: string;
    private _points: number;
    private _wins: number;
    private _gamesPlayed: number;

    constructor(
        id: number,
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

    // Métodos para obtener y establecer los campos
    getId(): number {
        return this._id;
    }

    setId(id: number): void {
        this._id = id;
    }

    getUsername(): string {
        return this._username;
    }

    setUsername(username: string): void {
        this._username = username;
    }

    getEmail(): Email {
        return this._email;
    }

    setEmail(email: Email): void {
        this._email = email;
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
}
