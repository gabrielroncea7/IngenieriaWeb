import { Game, IGame} from '../Game';
import { Attempt } from '../../attempt/Attempt';
import { Letter } from '../../letter/Letter';

describe('Game class tests', () => {
    let mockLetter: Letter;
    let mockAttempt: Attempt;

    beforeEach(() => {
        mockLetter = new Letter('a', 'red');
        mockAttempt = new Attempt(1, [mockLetter]);
    });

    test('Crear una instancia de Game correctamente', () => {
        const attempts = [mockAttempt];
        const date = new Date();
        const points = 10;
        const game = new Game(attempts, date, points);

        expect(game).toBeInstanceOf(Game);
        expect(game.getAttempts()).toEqual(attempts);
        expect(game.getDate()).toEqual(date);
        expect(game.getPoints()).toEqual(points);
    });

    test('Crear una instancia de Game utilizando el método jsonConstructor', () => {
        const gameData: IGame = {
            attempts: [{ order: 1, word: [{ value: 'a', color: 'red' }] }],
            date: new Date(),
            points: 10,
        };

        jest.spyOn(Attempt, 'jsonConstructor').mockImplementation((data) => {
            return mockAttempt;
        });

        const game = Game.jsonConstructor(gameData);

        expect(game).toBeInstanceOf(Game);
        expect(game.getAttempts()).toHaveLength(1);
        expect(game.getDate()).toEqual(gameData.date);
        expect(game.getPoints()).toEqual(gameData.points);
    });

    test('Crear una instancia de Game utilizando el método create', () => {
        const attempts = [mockAttempt];
        const date = new Date();
        const points = 10;

        const game = Game.create(attempts, date, points);

        expect(game).toBeInstanceOf(Game);
        expect(game?.getAttempts()).toEqual(attempts);
        expect(game?.getDate()).toEqual(date);
        expect(game?.getPoints()).toEqual(points);
    });

    test('Verificar si create no crea una instancia de Game cuando se pasan puntos inválidos.', () => {
        const attempts = [mockAttempt];
        const date = new Date();
        const points = -2;

        const game = Game.create(attempts, date, points);

        expect(game).toBeNull();
    });

    test('Prueba si se pueden establecer y obtener los intentos correctamente en una instancia de Game', () => {
        const game = new Game([mockAttempt], new Date(), 10);
        const newAttempts = [mockAttempt, mockAttempt];

        game.setAttempts(newAttempts);

        expect(game.getAttempts()).toEqual(newAttempts);
    });

    test('Verifica si se pueden establecer y obtener la fecha correctamente en una instancia de Game', () => {
        const game = new Game([mockAttempt], new Date(), 10);
        const newDate = new Date();

        game.setDate(newDate);

        expect(game.getDate()).toEqual(newDate);
    });

    test('Prueba si se pueden establecer y obtener los puntos correctamente en una instancia de Game', () => {
        const game = new Game([mockAttempt], new Date(), 10);
        const newPoints = 20;

        const result = game.setPoints(newPoints);

        expect(result).toBeTruthy();
        expect(game.getPoints()).toEqual(newPoints);
    });

    test('Verifica si no se pueden establecer puntos inválidos en una instancia de Game', () => {
        const game = new Game([mockAttempt], new Date(), 10);
        const newPoints = -2;

        const result = game.setPoints(newPoints);

        expect(result).toBeFalsy();
        expect(game.getPoints()).toEqual(10); // original points
    });

    test('Comprueba si se puede convertir una instancia de Game en un objeto JSON correctamente.', () => {
        const game = new Game([mockAttempt], new Date(), 10);
        const gameJson = game.toJson();

        expect(gameJson).toHaveProperty('attempts');
        expect(gameJson).toHaveProperty('date');
        expect(gameJson).toHaveProperty('points');
    });
});
