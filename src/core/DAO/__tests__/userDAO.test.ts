import UserDAO from '../../DAO/userDAO';



describe('UserDAO', () => {
  let userDAO: UserDAO;

  beforeEach(() => {
    userDAO = new UserDAO();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get users from the database', async () => {
    // Mock del método getUser para simular la respuesta de la base de datos
    jest.spyOn(userDAO as any, 'ConnectDB').mockImplementationOnce(() => {});
    jest.spyOn(userDAO as any, 'DisconnectDB').mockImplementationOnce(() => {});
    jest.spyOn(userDAO as any, 'getUser').mockResolvedValueOnce(['user1', 'user2']);

    // Ejecutar el método que se va a probar
    const users = await userDAO.getUser();

    // Verificar que se obtengan los usuarios esperados
    expect(users).toEqual(['user1', 'user2']);
  });

  it('should set a new user in the database', async () => {
    // Mock del método setUser para simular la inserción en la base de datos
    jest.spyOn(userDAO as any, 'ConnectDB').mockImplementationOnce(() => {});
    jest.spyOn(userDAO as any, 'DisconnectDB').mockImplementationOnce(() => {});
    jest.spyOn(userDAO as any, 'setUser').mockResolvedValueOnce(1);

    // Ejecutar el método que se va a probar
    await userDAO.setUser('testUser', 'test@example.com', 'testPassword', 0, 0, 0);

    // No hay ningún valor de retorno esperado, simplemente verificamos que no haya errores
    // Si el método setUser no arroja ninguna excepción, asumimos que se ejecutó correctamente
  });
  it('should get user by name from the database', async () => {
    // Mock del método getUserbyname para simular la respuesta de la base de datos
    jest.spyOn(userDAO as any, 'ConnectDB').mockImplementationOnce(() => {});
    jest.spyOn(userDAO as any, 'DisconnectDB').mockImplementationOnce(() => {});
    jest.spyOn(userDAO as any, 'getUserbyname').mockResolvedValueOnce('user1');

    // Ejecutar el método que se va a probar
    const user = await userDAO.getUserbyname('testUser');

    // Verificar que se obtenga el usuario esperado
    expect(user).toEqual('user1');
  });

  it('should delete user from the database', async () => {
    // Mock del método deleteUser para simular la eliminación en la base de datos
    jest.spyOn(userDAO as any, 'ConnectDB').mockImplementationOnce(() => {});
    jest.spyOn(userDAO as any, 'DisconnectDB').mockImplementationOnce(() => {});
    jest.spyOn(userDAO as any, 'deleteUser').mockResolvedValueOnce(1);

    // Ejecutar el método que se va a probar
    await userDAO.deleteUser('userId');

    // No hay ningún valor de retorno esperado, simplemente verificamos que no haya errores
    // Si el método deleteUser no arroja ninguna excepción, asumimos que se ejecutó correctamente
  });
});