import GameManager from '../gameManager'

describe('GameManager', () => {
    let gameManager: GameManager;

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
})