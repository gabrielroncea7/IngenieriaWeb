import GameManager from '../GameManager'
import UserDAO from '../../../model/userDAO/userDAO';
import { User } from '../../../domain/user/User';

describe('GameManager', () => {
    let gameManager: GameManager;
    let userDAO: UserDAO = UserDAO.getInstance()

    beforeEach(async () => {
        gameManager = new GameManager();
    });

    afterEach(async () => {
        jest.clearAllMocks();
    });

    it('Calc points test: Attempt 0', async () => {
        const points = gameManager.calcPoints(0);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(0);
    })
    it('Calc points test: Attempt 1', async () => {
        const points = gameManager.calcPoints(1);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(100);
    })
    it('Calc points test: Attempt 2', async () => {
        const points = gameManager.calcPoints(2);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(85);
    })
    it('Calc points test: Attempt 3', async () => {
        const points = gameManager.calcPoints(3);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(70);
    })
    it('Calc points test: Attempt 4', async () => {
        const points = gameManager.calcPoints(4);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(55);
    })
    it('Calc points test: Attempt 5', async () => {
        const points = gameManager.calcPoints(5);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(40);
    })
    it('Calc points test: Attempt 6', async () => {
        const points = gameManager.calcPoints(6);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(25);
    })
    it('Calc points test: Attempt 7', async () => {
        const points = gameManager.calcPoints(7);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(0);
    })
    it('Add points test', async ()=>{
        const user1: User | null = await userDAO.find('testUser'); 

        if (user1) { // Verificar si user1 no es null
            gameManager.addPoints(user1.getUsername(), 85)
                .then((resultado) => {

                    if(resultado == true){

                        userDAO.find('testUser')
                            .then((user2) => {

                                if(user2 != null){
                                    if (user2) { // Verificar si user2 no es null
                                        expect(user2.getPoints()).toEqual(user1.getPoints() + 85);
                                    } else {
                                        fail('User not found');
                                    }

                                }
                                else{

                                    fail('User2 not found');

                                }


                            })

                    }

                })
            
        } else {
            fail('User not found');
        }
    });
    it('Generate word', async ()=>{
        const max = 10;
        const min = 5;
        const word = await gameManager.generateWord();

        if(word){
            expect(word.get().length).toBeGreaterThanOrEqual(min);
            expect(word.get().length).toBeLessThanOrEqual(max);
        } else {
            fail('Word not found');
        }
    }, 20000);

    it('Test para probar la función getLastGame', async ()=>{
        userDAO.find('testUser')
            .then(async (user1) => {
                if(user1){
                    gameManager.getLastGame('testUser')
                        .then((game) => {
                            if(game != null){
        
                                expect(typeof game).toBe('Game');
                                expect(game.getAttempts().length).toBeGreaterThan(0);
        
                            }
                            else{
        
                                console.error('Game not found');
        
                            }
        
                        })
                    
                }
                else{
                    console.error('user not found');
                }
            })
        
    }, 20000);
});