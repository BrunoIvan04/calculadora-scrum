import { evaluate, tokenize, CalculatorError } from '../calculator';

describe('operaciones básicas', () => {
  test('suma dos números', () => {
    expect(evaluate('8+2')).toBe(10);
  });

  test('resta dos números', () => {
    expect(evaluate('8-2')).toBe(6);
  });

  test('multiplica dos números', () => {
    expect(evaluate('8×2')).toBe(16);
    expect(evaluate('8*2')).toBe(16);
  });

  test('divide dos números', () => {
    expect(evaluate('8÷2')).toBe(4);
    expect(evaluate('8/2')).toBe(4);
  });

  test('resta que da resultado negativo', () => {
    expect(evaluate('2-8')).toBe(-6);
  });
});

describe('jerarquía de operaciones', () => {
  test('multiplica antes de sumar', () => {
    expect(evaluate('2+3×4')).toBe(14);
  });

  test('divide antes de restar', () => {
    expect(evaluate('10-6÷2')).toBe(7);
  });

  test('operaciones del mismo nivel se resuelven de izquierda a derecha', () => {
    expect(evaluate('10-4-3')).toBe(3);
    expect(evaluate('100÷10÷2')).toBe(5);
  });

  test('expresión larga con varios operadores', () => {
    expect(evaluate('5+6×2-8÷4')).toBe(15);
  });
});

describe('errores', () => {
  test('división entre cero', () => {
    expect(() => evaluate('5÷0')).toThrow('No se puede dividir entre cero');
  });

  test('operación vacía', () => {
    expect(() => evaluate('')).toThrow(CalculatorError);
  });

  test('operación que termina en operador', () => {
    expect(() => evaluate('5+')).toThrow(CalculatorError);
  });

  test('dos operadores seguidos', () => {
    expect(() => evaluate('5+×2')).toThrow(CalculatorError);
  });

  test('carácter no válido', () => {
    expect(() => evaluate('5+a')).toThrow(CalculatorError);
  });
});

describe('tokenize', () => {
  test('separa números y operadores', () => {
    expect(tokenize('12+3×4')).toEqual([12, '+', 3, '*', 4]);
  });
});
