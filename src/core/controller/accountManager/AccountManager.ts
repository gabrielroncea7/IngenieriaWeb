// Import class user & email
import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';
 
class AccountManager {
    private users: User[];

    constructor() {
        // Inicialize the empty user list when creating an instance of AccountManager
        this.users = [];
    }

    // Method to sign in
    signIn(username: string, password: string): boolean {
        // Search for the user by username
        const user = this.users.find(u => u.getUsername() === username);
        // If the user is found and the password is correct, return true
        if (user && user.getPassword() === password) {
            console.log('Inicio de sesión exitoso.');
            return true;
        }
        // Else, return false
        console.log('Nombre de usuario o contraseña incorrectos. Inicio de sesión fallido.');
        return false;
    }

    // Method to sign up
    signUp(username: string, email: string, password: string): void {
        // Verify if the username is already in use
        if (this.users.some(u => u.getUsername() === username)) {
            console.log('El nombre de usuario ya está en uso. Por favor, elija otro.');
            return;
        }

        // Create a new instance of Email
        const userEmail = new Email(email);

        // Create a new instance of User and add it to the user list
        const newUser = new User(
            "",
            username,
            userEmail,
            password,
            0, // Points initialized at 0
            0, // Victories initialized at 0
            0  // Games played initialized at 0
        );
        this.users.push(newUser);
        console.log('Registro exitoso.');
    }

    // Method to sign out
    logOut(username: string): void {
        console.log(`Cerrando sesión para el usuario ${username}.`);
        // Logic to sign out the user
        
    }

    // Method to delete an account by username and password
    deleteAccount(username: string, password: string): void {
        // Search for the user by username
        const index = this.users.findIndex(u => u.getUsername() === username);
        // If the user is found and the password is correct, delete the account
        if (index !== -1 && this.users[index].getPassword() === password) {
            this.users.splice(index, 1);
            console.log(`La cuenta del usuario ${username} ha sido eliminada.`);
            return;
        }
        // Else, show an error message
        console.log('Nombre de usuario o contraseña incorrectos. No se puede eliminar la cuenta.');
    }
}
