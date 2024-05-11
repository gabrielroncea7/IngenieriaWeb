import AccountManager from '../AccountManager';
import { User } from '../../../domain/user/User';
import { Email } from '../../../domain/email/Email';

describe('Pruebas para la clase AccountManager', () => {
    let accountManager: AccountManager;

    beforeEach(() => {
        accountManager = new AccountManager();
    });

    it('Probar función signIn con credenciales correctas', () => {
        const username = 'testuser';
        const password = 'testpassword';
        const user = new User('', username, new Email('test@example.com'), password, 0, 0, 0);
        accountManager.signUp(username, 'test@example.com', password);
        const result = accountManager.signIn(username, password);
        expect(result).toBe(true);
    });

    it('Probar función signIn con credenciales incorrectas', () => {
        const username = 'testuser';
        const password = 'testpassword';
        accountManager.signUp(username, 'test@example.com', password);
        const result = accountManager.signIn(username, 'wrongpassword');
        expect(result).toBe(false);
    });

    it('Probar función signUp con nombre de usuario ya existente', () => {
        const username = 'existinguser';
        const password = 'testpassword';
        accountManager.signUp(username, 'test@example.com', password);
        // Intentar registrar el mismo usuario nuevamente
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        accountManager.signUp(username, 'another@example.com', password);
        expect(consoleSpy).toHaveBeenCalledWith('El nombre de usuario ya está en uso. Por favor, elija otro.');
        consoleSpy.mockRestore();
    });

    it('Probar función logOut', () => {
        const username = 'testuser';
        const password = 'testpassword';
        accountManager.signUp(username, 'test@example.com', password);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        accountManager.logOut(username);
        expect(consoleSpy).toHaveBeenCalledWith(`Cerrando sesión para el usuario ${username}.`);
        consoleSpy.mockRestore();
    });

    it('Probar función deleteAccount con credenciales correctas', () => {
        const username = 'testuser';
        const password = 'testpassword';
        accountManager.signUp(username, 'test@example.com', password);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        accountManager.deleteAccount(username, password);
        expect(consoleSpy).toHaveBeenCalledWith(`La cuenta del usuario ${username} ha sido eliminada.`);
        consoleSpy.mockRestore();
    });

    it('Probar función deleteAccount con credenciales incorrectas', () => {
        const username = 'testuser';
        const password = 'testpassword';
        accountManager.signUp(username, 'test@example.com', password);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        accountManager.deleteAccount(username, 'wrongpassword');
        expect(consoleSpy).toHaveBeenCalledWith('Nombre de usuario o contraseña incorrectos. No se puede eliminar la cuenta.');
        consoleSpy.mockRestore();
    });
});


