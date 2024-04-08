// Import Express
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
