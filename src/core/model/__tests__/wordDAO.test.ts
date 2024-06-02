import WordDAO from '../wordDAO/wordDAO';
import { Word } from '../../domain/word/Word'
describe('Pruebas para la clase WordDAO', () => {
  const wordDAO1 = WordDAO.getInstance();
  let word1 : Word;


  it('Probar funcion addWord', async()=> {
    let word= await wordDAO1.addWord('Prueba');
    expect(word).toEqual(true);


  });

  it('Probar funcion find (devuelve la última palabra introducida)', async()=> {
    let word = await wordDAO1.find()
    let word1 = await wordDAO1.find()
    expect(word?.get()).toEqual(word1?.get());

  });

  it('Probar funcion getWords',async()=> {
    let words =await wordDAO1.getWords();
    let words1 = await wordDAO1.getWords();
    expect(words).toEqual(words1);
  })
});
