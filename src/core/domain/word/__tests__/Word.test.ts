import { Word } from '../Word';

describe('Word class', () => {
    let word: Word;
    const validWord = 'example';
    const invalidWordShort = 'hi';
    const invalidWordLong = 'supercalifragilisticexpialidocious';

    beforeEach(() => {
        word = new Word(validWord, new Date());
    });

    it('Crear una instancia de Word válida', () => {
        expect(word.get()).toBe(validWord);
        expect(word.getDate()).toBeInstanceOf(Date);
    });

    it('No debería crear una instancia de Word válida', () => {
        const result = word.create(invalidWordShort, new Date());
        expect(result).toBe(false);
        expect(word.get()).toBe(validWord); // La palabra original no debería cambiar
    });

    it('No debería crear una instancia de Word válida con una palabra larga', () => {
        const result = word.create(invalidWordLong, new Date());
        expect(result).toBe(false);
        expect(word.get()).toBe(validWord); // La palabra original no debería cambiar
    });

    it('Debería establecer una palabra usando el método setByWordObj', () => {
        const newWord = 'newWord';
        const result = word.setByWordObj(newWord);
        expect(result).toBe(true);
        expect(word.get()).toBe(newWord);
    });

    it('No debería establecer una palabra usando el método setByWordObj con una palabra corta', () => {
        const result = word.setByWordObj(invalidWordShort);
        expect(result).toBe(false);
        expect(word.get()).toBe(validWord);
    });
    it('No debería establecer una palabra usando el método setByWordObj con  una palabra larga', () => {
        const result = word.setByWordObj(invalidWordLong);
        expect(result).toBe(false);
        expect(word.get()).toBe(validWord);
    });
    it('Debería establecer una palabra usando el método set con otro objeto de Word', () => {
        const newWord = 'newWord';
        const newWordObj = new Word(newWord, new Date());
        word.set(newWordObj);
        expect(word.get()).toBe(newWord);
        expect(word.getDate()).toBe(newWordObj.getDate());
    });
    it('Debería crear una instancia de Word válida usando el método Maker', () => {
        const wordObj = Word.Maker(validWord);
        expect(wordObj.get()).toBe(validWord);
        expect(wordObj.getDate()).toBeInstanceOf(Date);
    });
});
