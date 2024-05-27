const emailFormat: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class Email {
    private _email: string;
    
    constructor(email: string) {
        this._email = email;
    }

    // Método estático para crear una instancia de Email
    static create(email: string): Email | null {
        if (typeof email === 'string' && emailFormat.test(email)) {
            return new Email(email)
        } else {
            return null;
        }
    }

    // Método para establecer el email
    set(email: string): boolean {
        if (typeof email === 'string' && emailFormat.test(email)) {
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

    // Método para establecer el email usando otro objeto Email
    setByEmailObj(emailObj: Email):boolean {
        if (emailObj instanceof Email) {
            this._email = emailObj.get();
            return true;
        } else {
            return false;
        }
    }
}
