import { User } from '../User';
import { Email } from '../../email/Email';


describe('Pruebas para la clase User', () => {
    let user: User;
    const email = new Email('example@example.com');
    
    
    beforeEach(() => {
        user = new User('id', 'username', email, 'password', 0, 0, 0);
    });


    test('Comprobar getters y setters', () => {
        expect(user.getId()).toBe('id');
        expect(user.getUsername()).toBe('username');
        //expect(user.getEmail()).toBe(email);
        expect(user.getPassword()).toBe('password');
        expect(user.getPoints()).toBe(0);
        expect(user.getWins()).toBe(0);
        expect(user.getGamesPlayed()).toBe(0);

        user.setId('id1');
        user.setUsername('newUsername');
       //user.setEmail(new Email('new@example.com'));
        user.setPassword('newPassword');
        user.setPoints(10);
        user.setWins(5);
        user.setGamesPlayed(3);

        expect(user.getId()).toBe('id1');
        expect(user.getUsername()).toBe('newUsername');
        //expect(user.getEmail().get()).toBe('new@example.com');
        expect(user.getPassword()).toBe('newPassword');
        expect(user.getPoints()).toBe(10);
        expect(user.getWins()).toBe(5);
        expect(user.getGamesPlayed()).toBe(3);
    });
    test('Comprobar si añade datos correctamente',() => {
        user.setId('id2');
        user.setUsername('user');
       //user.setEmail(new Email('new@example.com'));
        user.setPassword('3399394');
        user.setPoints(495);
        user.setWins(7);
        user.setGamesPlayed(2);
        //Salidas esperadas
        expect(user.getId()).toBe('id2');
        expect(user.getUsername()).toBe('user');
        //expect(user.getEmail().get()).toBe('new@example.com');
        expect(user.getPassword()).toBe('3399394');
        expect(user.getPoints()).toBe(495);
        expect(user.getWins()).toBe(7);
        expect(user.getGamesPlayed()).toBe(2);
    });
});
