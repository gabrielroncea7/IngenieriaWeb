import { Letter } from '../Letter'

describe('Letter class', () =>{
    let letter: Letter;
    let letter1: Letter;
    const validValue = 'A';
    const validColor = 'green';
    beforeEach(() => {
        letter  = new Letter(validValue, validColor);
    });
    it('Crear una instancia de Letter válida', () => {
        expect(letter.getValue()).toEqual(validValue);
        expect(letter.getColor()).toEqual(validColor);
    });

    it('Probar funcion create', () =>{
        expect(Letter.create(validValue,validColor)).toEqual(letter);

    });

    it('Probar función create con un color que no sea rojo,amarillo o verde', () =>{
        expect(Letter.create('A','purple')).toEqual(null);

    });

    it('Probar función create metiendo una cadena que tenga un numero',() => {
        expect(Letter.create('1','red')).toEqual(null);
    })

    it('Probar función jsonCreate con un objeto válido', () =>{
        // Define un objeto que cumpla con la interfaz ILetter
        const validLetterJSON = { value: 'A', color: 'green' };
        
        // Llama a la función jsonCreate con el objeto válido y verifica el resultado
        expect(Letter.jsonCreate(validLetterJSON)).toEqual(letter);
    });
    
    it('Probar función jsonCreate con un color inválido', () =>{
        // Define un objeto con un color no válido
        const invalidColorLetterJSON = { value: 'A', color: 'purple' };
        
        // Llama a la función jsonCreate con el objeto inválido y verifica que devuelva null
        expect(Letter.jsonCreate(invalidColorLetterJSON)).toBeNull();
    });
    
    it('Probar función jsonCreate con un valor inválido', () =>{
        // Define un objeto con un valor no válido
        const invalidValueLetterJSON = { value: '1', color: 'red' };
        
        // Llama a la función jsonCreate con el objeto inválido y verifica que devuelva null
        expect(Letter.jsonCreate(invalidValueLetterJSON)).toBeNull();
    });




});