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
        expect(email.create('usuario')).toBe(false);
        expect(email.get()).toBe('ejemplo@ejemplo.es');
        expect(email.create('usuario@usuario.com')).toBe(true);
        expect(email.get()).toBe('usuario@usuario.com');
        expect(email.setByEmailObj(email1)).toBe(true);
        expect(email.get()).toBe('usuario2@usuario.es');
        expect(email.set('usuario')).toBe(false);
        expect(email.get()).toBe('usuario2@usuario.es');

    });
    test('Comprobar metodo maker', () => {
        const emailString1 = 'test@example.com';
        const emailString2 = 'usuario';
        const emailInstance1 = Email.Maker(emailString1);
        const emailInstance2 = Email.Maker(emailString2);
        expect(emailInstance1 instanceof Email).toBe(true);
        expect(emailInstance1.get()).toBe(emailString1);
        expect(emailInstance2 instanceof Email).toBe(false);
        expect(emailInstance2.get()).toBe(emailString2);
    });
});