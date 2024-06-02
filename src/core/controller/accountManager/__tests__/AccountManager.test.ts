import AccountManager from '../AccountManager';
import { User } from '../../../domain/user/User';
import { Email } from '../../../domain/email/Email';

describe('Pruebas para la clase AccountManager', () => {
    let accountManager: AccountManager;

    beforeEach(() => {
        accountManager = new AccountManager();
    });

    it('Probar función signIn con credenciales correctas', async () => {
        const username = 'testuser';
        const password = 'testpassword';
        const user = new User('', username, new Email('test@example.com'), password, 0, 0, 0);
        await accountManager.signUp(username, 'test@example.com', password);
        const result = await accountManager.signIn(username, password);
        expect(result).toBe(true);
    });

    it('Probar función signIn con credenciales incorrectas', async() => {
        const username = 'testuser';
        const password = 'testpassword';
        await accountManager.signUp(username, 'test@example.com', password);
        const result = await accountManager.signIn(username, 'wrongpassword');
        expect(result).toBe(false);
    });

    it('Probar función signUp con nombre de usuario ya existente', async() => {
        const username = 'existinguser';
        const password = 'testpassword';
        await accountManager.signUp(username, 'test@example.com', password);
        // Intentar registrar el mismo usuario nuevamente
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const sign = await accountManager.signUp(username,'another@example.com', password);
        expect(sign).toBeFalsy()
        consoleSpy.mockRestore();
    });

    it('Probar función deleteAccount con credenciales correctas', async() => {
        const username = 'testuser';
        const password = 'testpassword';
        await accountManager.signUp(username, 'test@example.com', password);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const deleted = await accountManager.deleteAccount(username, password);
        expect(deleted).toBeTruthy()
        consoleSpy.mockRestore();
    });

    it('Probar función deleteAccount con credenciales incorrectas', async() => {
        const username = 'testuser';
        const password = 'testpassword';
        await accountManager.signUp(username, 'test@example.com', password);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const deleted = await accountManager.deleteAccount(username, 'wrongpassword');
        expect(deleted).toBeFalsy()
        consoleSpy.mockRestore();
    });
});


