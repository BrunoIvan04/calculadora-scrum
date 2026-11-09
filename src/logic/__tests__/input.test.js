import { deleteLastChar } from '../input';

describe('deleteLastChar', () => {
  test('elimina el último número capturado', () => {
    expect(deleteLastChar('125')).toBe('12');
  });

  test('elimina un operador al final', () => {
    expect(deleteLastChar('8×')).toBe('8');
    expect(deleteLastChar('8÷')).toBe('8');
  });

  test('con un solo carácter deja la captura vacía', () => {
    expect(deleteLastChar('7')).toBe('');
  });

  test('con la captura vacía no hace nada', () => {
    expect(deleteLastChar('')).toBe('');
  });
});
