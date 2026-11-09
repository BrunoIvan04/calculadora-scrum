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

const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
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

function applyOperator(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw new CalculatorError('No se puede dividir entre cero');
      }
      return a / b;
    default:
      throw new CalculatorError(`Operador desconocido: ${operator}`);
  }
}

/**
 * Evalúa una expresión y regresa el resultado numérico.
 * Usa dos pilas (números y operadores) para respetar la jerarquía:
 * multiplicación y división antes que suma y resta.
 */
export function evaluate(expression) {
  const tokens = tokenize(expression);
  const values = [];
  const operators = [];

  const reduce = () => {
    const operator = operators.pop();
    const b = values.pop();
    const a = values.pop();
    values.push(applyOperator(a, b, operator));
  };

  for (const token of tokens) {
    if (typeof token === 'number') {
      values.push(token);
    } else {
      while (
        operators.length > 0 &&
        PRECEDENCE[operators[operators.length - 1]] >= PRECEDENCE[token]
      ) {
        reduce();
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    reduce();
  }

  return values[0];
}
