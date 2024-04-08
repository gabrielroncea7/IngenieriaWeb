// Import Express.js
const express = require('express');

// Creating an instance of express
const app = express();

// Class Email
class Email {
    // Method Maker witheout specifications
    constructor(email) {
        this._email = email;
    }

    // Method Set to stablish the email
    set(email) {
        if (typeof email === 'string') {
            this._email = email;
            return true;
        } else {
            return false;
        }
    }

    // Method Get to obtain the email
    get() {
        return this._email;
    }

  // Method Create with the specific restrictions of Value Object Pattern
  create(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (typeof email === 'string' && emailRegex.test(email)) {
        this._email = email;
        return true;
    } else {
        return false;
    }
}
    // Método to stablish an email using an object email
    set(emailObj) {
        if (emailObj instanceof Email) {
            this._email = emailObj.get();
            return true;
        } else {
            return false;
        }
    }
}

// Examples of use
let myEmail = Email.Maker('example@example.com');
console.log('Email inicial:', myEmail.get());

myEmail.create('newexample@example.com');
console.log('Email creado:', myEmail.get());

myEmail.set('anotherexample@example.com');
console.log('Email establecido:', myEmail.get());

let anotherEmail = Email.Maker('anotherexample@example.com');
myEmail.set(anotherEmail);
console.log('Email establecido con otro objeto Email:', myEmail.get());

// Starting express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
