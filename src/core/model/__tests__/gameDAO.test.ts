// Importa las clases y métodos necesarios
import GameDAO from '../gameDAO/gameDAO';
import { Attempt } from '../../domain/attempt/Attempt';
import { Game } from '../../domain/game/Game';
import { Letter } from '../../domain/letter/Letter';

// Describe tus pruebas unitarias
describe('Pruebas para la clase GameDAO', () => {
    // Define las variables necesarias para las pruebas
    const gameDAO = GameDAO.getInstance();
    const username = "Plantilla";
    const attempts = []; // Define los intentos necesarios para tus pruebas
    const letter1 = new Letter("A", "green");
    const letter2 = new Letter("B", "red");
    const letter3 = new Letter("C", "yellow");

// Suponiendo que orden es 1 y la lista de letras está formada por letter1, letter2 y letter3
const attempt = new Attempt(1, [letter1, letter2, letter3]);
    
    // Prueba la función addGame
    it('Probar función addGame', async () => {
        // Llama a la función addGame y realiza las aserciones necesarias
        const result = await gameDAO.addGame(username, attempt);
        expect(result).toEqual(true); // Por ejemplo, verifica si la función devuelve true
    });

    // Prueba la función addAttempt
    it('Probar función addAttempt', async () => {
        // Llama a la función addAttempt y realiza las aserciones necesarias
        const result = await gameDAO.addAttempt(username, attempt);
        expect(result).toEqual(true); // Por ejemplo, verifica si la función devuelve true
    });

    // Prueba la función getLastGame
    it('Probar función getLastGame', async () => {
        // Llama a la función getLastGame y realiza las aserciones necesarias
        const game: Game | null = await gameDAO.getLastGame(username);
        expect(game).not.toBeNull(); // Por ejemplo, verifica si el juego no es nulo
        if (game) {
            // Realiza más aserciones específicas sobre el objeto Game si es necesario
            expect(game.date).toBeDefined();
        }
    });
});

