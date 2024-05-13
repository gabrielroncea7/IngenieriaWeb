import GameDAO from '../gameDAO/gameDAO';

describe('Pruebas para la clase GameDAO', ()=>{
    const gameDAO1 = GameDAO.getInstance();
    const username = "Plantilla"
    //Juego completo
    const attempts = "[[{\"value\": \"H\", \"color\": \"green\"}, {\"value\": \"O\", \"color\": \"green\"}, {\"value\": \"L\", \"color\": \"green\"}, {\"value\": \"O\", \"color\":  \"red\"}]]"
    //Un intento
    const attempt = "[{\"value\": \"H\", \"color\": \"green\"}, {\"value\": \"O\", \"color\": \"green\"}, {\"value\": \"L\", \"color\": \"green\"}, {\"value\": \"A\", \"color\":  \"green\"}]"

    
    
    it('Probar función addGame de un user que está en la BBDD', async () => {
        let game = await gameDAO1.addGame(username, attempts).then((game) =>{
            expect(game).toEqual(true);
        });

        
    });



    it('Probar función addAttempt', async () => {
        await gameDAO1.addAttempt(username, attempt).then((result) => {
        expect(result).toEqual(true);
        });
    });

    it('Probar función getLastGame', async () => {
        await gameDAO1.getLastGame('Plantilla').then((game) =>{
            if (game !== false) {
                expect(typeof game).toBe('string');
                expect(game.length).toBeGreaterThan(0);
                console.log(game);
                 
            } else {
                // Si game es false, la prueba debe fallar
                fail('El juego no fue encontrado en la base de datos');
                
            }

        });
        
    });





});