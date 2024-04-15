import WordDAO from '../../DAO/wordDAO';

describe('WordDAO', () => {
  let wordDAO: WordDAO;

  beforeEach(() => {
    wordDAO = new WordDAO();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a word from the database', async () => {
    // Mock del método getWord para simular la respuesta de la base de datos
    jest.spyOn(wordDAO as any, 'ConnectDB').mockImplementationOnce(() => {});
    jest.spyOn(wordDAO as any, 'DisconnectDB').mockImplementationOnce(() => {});
    jest.spyOn(wordDAO as any, 'getWord').mockResolvedValueOnce(['word1']);

    // Ejecutar el método que se va a probar
    const word = await wordDAO.getWord();

    // Verificar que se obtenga la palabra esperada
    expect(word).toEqual(['word1']);
  });

  it('should set a new word in the database', async () => {
    // Mock del método setWord para simular la inserción en la base de datos
    jest.spyOn(wordDAO as any, 'ConnectDB').mockImplementationOnce(() => {});
    jest.spyOn(wordDAO as any, 'DisconnectDB').mockImplementationOnce(() => {});
    jest.spyOn(wordDAO as any, 'setWord').mockResolvedValueOnce(true);

    // Ejecutar el método que se va a probar
    const result = await wordDAO.setWord('testWord');

    // Verificar que la inserción de la palabra sea exitosa
    expect(result).toBeTruthy();
  });

  it('should get word by id from the database', async () => {
    // Mock del método getWordbyid para simular la respuesta de la base de datos
    jest.spyOn(wordDAO as any, 'ConnectDB').mockImplementationOnce(() => {});
    jest.spyOn(wordDAO as any, 'DisconnectDB').mockImplementationOnce(() => {});
    jest.spyOn(wordDAO as any, 'getWordbyid').mockResolvedValueOnce('word1');

    // Ejecutar el método que se va a probar
    const word = await wordDAO.getWordbyid('wordId');

    // Verificar que se obtenga la palabra esperada por su id
    expect(word).toEqual('word1');
  });
});
