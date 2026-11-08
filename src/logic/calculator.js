/**
 * Lógica de la calculadora.
 *
 * Evalúa expresiones capturadas por el usuario (por ejemplo "2+3×4")
 * respetando la jerarquía de operaciones. Está separada de la interfaz
 * para poder probarla de forma independiente.
 */

export class CalculatorError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CalculatorError';
  }
}

// Símbolos que se muestran en el teclado y su equivalente interno.
const OPERATOR_ALIASES = {
  '+': '+',
  '-': '-',
  '−': '-',
  '*': '*',
  '×': '*',
  'x': '*',
  '/': '/',
  '÷': '/',
};

export const OPERATORS = ['+', '-', '×', '÷'];

export function isOperator(char) {
  return Object.prototype.hasOwnProperty.call(OPERATOR_ALIASES, char);
}

/**
 * Convierte la cadena capturada en una lista de tokens (números y operadores).
 */
export function tokenize(expression) {
  if (typeof expression !== 'string' || expression.trim() === '') {
    throw new CalculatorError('No hay ninguna operación para calcular');
  }

  const tokens = [];
  let current = '';

  for (const char of expression.replace(/\s+/g, '')) {
    if (/[0-9.]/.test(char)) {
      current += char;
    } else if (isOperator(char)) {
      if (current === '') {
        throw new CalculatorError('Operación inválida');
      }
      tokens.push(parseNumber(current));
      tokens.push(OPERATOR_ALIASES[char]);
      current = '';
    } else {
      throw new CalculatorError(`Carácter no válido: ${char}`);
    }
  }

  if (current === '') {
    throw new CalculatorError('La operación no puede terminar en un operador');
  }
  tokens.push(parseNumber(current));
  return tokens;
}

function parseNumber(text) {
  if ((text.match(/\./g) || []).length > 1 || text === '.') {
    throw new CalculatorError(`Número inválido: ${text}`);
  }
  return Number(text);
}
