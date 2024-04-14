export class Email {
    private _email: string;

    constructor(email: string) {
        this._email = email;
    }

    // Método estático para crear una instancia de Email
    static Maker(email: string): Email {
        return new Email(email);
    }

    // Método para establecer el email
    set(email: string): boolean {
        if (typeof email === 'string') {
            this._email = email;
            return true;
        } else {
            return false;
        }
    }

    // Método para obtener el email
    get(): string {
        return this._email;
    }

    // Método para crear un email con el formato especificado
    create(email: string): boolean {
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (typeof email === 'string' && emailRegex.test(email)) {
            this._email = email;
            return true;
        } else {
            return false;
        }
    }

    // Método para establecer el email usando otro objeto Email
    setByEmailObj(emailObj: Email): boolean {
        if (emailObj instanceof Email) {
            this._email = emailObj.get();
            return true;
        } else {
            return false;
        }
    }
}
