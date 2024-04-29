import { AccountManager } from '../AccountManager';

describe('Pruebas para la clase AccountManager', () => {
    let accountManager: AccountManager;

    beforeEach(() => {
        accountManager = new AccountManager();
    });

    describe('Pruebas para el método signIn()', () => {
        test('Debería iniciar sesión exitosamente con credenciales válidas', () => {
            accountManager.signUp('prueba', 'prueba@gmail.com', '12345');
            expect(accountManager.signIn('prueba', '12345')).toBe(true);
        });

        test('Debería fallar al iniciar sesión con credenciales incorrectas', () => {
            accountManager.signUp('prueba', 'prueba@gmail.com', '12345');
            expect(accountManager.signIn('prueba', 'incorrecta')).toBe(false);
        });

        test('Debería fallar al iniciar sesión si el usuario no está registrado', () => {
            expect(accountManager.signIn('usuarioNoRegistrado', 'contraseña')).toBe(false);
        });
    });

    describe('Pruebas para el método signUp()', () => {
        test('Debería registrarse correctamente con credenciales válidas', () => {
            accountManager.signUp('nuevoUsuario', 'nuevo@gmail.com', 'contraseña');
            expect(accountManager.signIn('nuevoUsuario', 'contraseña')).toBe(true);
        });

    });

    
});
