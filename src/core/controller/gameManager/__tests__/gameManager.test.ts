import GameManager from '../gameManager'
import UserDAO from '../../../model/userDAO/userDAO';

describe('GameManager', () => {
    let gameManager: GameManager;
    let userDAO: UserDAO

    beforeEach(() => {
        gameManager = new GameManager();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Calc points test: Attempt 0', async () => {
        const points = gameManager.calcPoints(0);

        // Verificar que se obtengan los usuarios esperados
        expect(points).toEqual(-1);
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
        expect(points).toEqual(-1);
    })
    it('Add points test', async ()=>{
        const user1 = userDAO.find('testUser')
        gameManager.addPoints(85)
        const user2 = userDAO.find('testUser')
        expect(user2.getPoints()).toEqual(user1.getPoints() + 85);
    })
    it('Generate word', async ()=>{
        const max = 10
        const min = 5
        const word = gameManager.generateWord()
        expect(word.get().length).toBeGreaterThanOrEqual(min)
        expect(word.get().length).toBeLessThanOrEqual(max)
    })
})