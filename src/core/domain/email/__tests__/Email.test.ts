import { Email } from '../Email';

describe('Pruebas para la clase Email', () => {
    let email: Email;
    let email1: Email;
    
    beforeEach(() => {
        email = new Email('ejemplo@ejemplo.es');
        email1 = new Email('usuario2@usuario.es');
    });

    test('Comprobar getters y setters', () => {
        expect(email.get()).toBe('ejemplo@ejemplo.es');
        expect(email.set('usuario')).toBe(false);
        expect(email.get()).toBe('ejemplo@ejemplo.es');
        expect(email.set('usuario@usuario.com')).toBe(true);
        expect(email.get()).toBe('usuario@usuario.com');
        expect(email.setByEmailObj(email1)).toBe(true);
        expect(email.get()).toBe('usuario2@usuario.es');
        expect(email.set('usuario')).toBe(false);
        expect(email.get()).toBe('usuario2@usuario.es');
    });

    test('Comprobar método create', () => {
        const emailString1 = 'test@example.com';
        const emailString2 = 'usuario';
        const emailInstance1 = Email.create(emailString1);
        const emailInstance2 = Email.create(emailString2);
        expect(emailInstance1).toBeInstanceOf(Email);
        expect(emailInstance1?.get()).toBe(emailString1);
        expect(emailInstance2).toBeNull();
    });
});
