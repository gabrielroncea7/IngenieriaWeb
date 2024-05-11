import GameDAO from '../gameDAO/gameDAO';

describe('Pruebas para la clase GameDAO', ()=>{
    const gameDAO1 = GameDAO.getInstance();
    it('Probar función getLastGame', async () => {
        let game = await gameDAO1.getLastGame('Prueba');
        console.log(game);
        if (game !== false) {
            expect(typeof game).toBe('string');
            expect(game.length).toBeGreaterThan(0);
             
        } else {
            // Si game es false, la prueba debe fallar
            fail('El juego no fue encontrado en la base de datos');
            
        }
    });
    
    it('Probar función addGame de un user que está en la BBDD', async () => {
        let game = await gameDAO1.addGame('Prueba', '["3A"]');
        expect(game).toEqual(true);
        
    });



    it('Probar función addAttempt', async () => {
        // Agregar un juego primero
        await gameDAO1.addGame('Prueba', '["3A"]');
        // Agregar un intento al juego existente
        let attemptAdded = await gameDAO1.addAttempt('Prueba', '[{"value": "4A", "color": "red"}]');
        expect(attemptAdded).toEqual(true);
    });







});