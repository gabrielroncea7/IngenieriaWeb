// Attempt.test.ts

import { Attempt } from '../Attempt';
import { Letter } from '../../letter/Letter';

describe('Attempt', () => {
  // Test for the constructor
  test('Debería crear una instancia Attempt', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const attempt = new Attempt(1, letters);
    expect(attempt.getOrder()).toBe(1);
    expect(attempt.getWord()).toEqual(letters);
  });

  // Test for jsonConstructor
  test('jsonConstructor debería crear una instancia de Attempt desde JSON', () => {
    const jsonAttempt = {
      word: [
        { value: 'a', color: 'green' },
        { value: 'b', color: 'red' }
      ]
    };
    const attempt = Attempt.jsonConstructor(jsonAttempt, 1);
    expect(attempt.getOrder()).toBe(1);
    expect(attempt.getWord().length).toBe(2);
    expect(attempt.getWord()[0].getValue()).toBe('a');
    expect(attempt.getWord()[0].getColor()).toBe('green');
  });

  // Test for create method
  test('Verifica que el método create retorna una instancia válida de Attempt cuando el parámetro order es un número válido ', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const attempt = Attempt.create(1, letters);
    expect(attempt).not.toBeNull();
  });

  test('Create debe devolver nulo si el parámetro order no es válido', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const attempt = Attempt.create(7, letters);
    expect(attempt).toBeNull();
  });

  // Test for jsonCreate method
  test('jsonCreate deberia retornar una instancia de Attempt  si los parámetros order y letters son válidos', () => {
    const jsonAttempt = {
      word: [
        { value: 'a', color: 'green' },
        { value: 'b', color: 'red' }
      ]
    };
    const attempt = Attempt.jsonCreate(jsonAttempt, 1);
    expect(attempt).not.toBeNull();
    expect(attempt!.getOrder()).toBe(1);
  });

  test('jsonCreate deberia retornar null si alguna letter es invalida', () => {
    const jsonAttempt = {
      word: [
        { value: 'a', color: 'green' },
        { value: 'b', color: 'blue' }  // Invalid color
      ]
    };
    const attempt = Attempt.jsonCreate(jsonAttempt, 1);
    expect(attempt).toBeNull();
  });

  // Test for getOrder and getWord methods
  test('getOrder deberia retornar el parámetro order', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const attempt = new Attempt(1, letters);
    expect(attempt.getOrder()).toBe(1);
  });

  test('getWord deberia retornar el parámetro word', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const attempt = new Attempt(1, letters);
    expect(attempt.getWord()).toEqual(letters);
  });

  // Test for setOrder method
  test('setOrder deberia actualizar el parametro order si es valido', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const attempt = new Attempt(1, letters);
    const result = attempt.setOrder(2);
    expect(result).toBe(true);
    expect(attempt.getOrder()).toBe(2);
  });

  test('setOrder no deberia actualizar si el parametro order es invalido', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const attempt = new Attempt(1, letters);
    const result = attempt.setOrder(7);
    expect(result).toBe(false);
    expect(attempt.getOrder()).toBe(1);
  });

  // Test for setWord method
  test('setWord deberia actualizar el parámetro word', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const newLetters = [new Letter('c', 'yellow'), new Letter('d', 'green')];
    const attempt = new Attempt(1, letters);
    attempt.setWord(newLetters);
    expect(attempt.getWord()).toEqual(newLetters);
  });

  // Test for toJson method
  test('toJson deberia retornar la correcta representación del JSON ', () => {
    const letters = [new Letter('a', 'green'), new Letter('b', 'red')];
    const attempt = new Attempt(1, letters);
    const json = attempt.toJson();
    expect(json).toEqual({
      word: [
        { value: 'a', color: 'green' },
        { value: 'b', color: 'red' }
      ]
    });
  });
});
