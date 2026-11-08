
export function evaluate(expression) {
  if (!expression || !expression.trim()) {
    return '0';
  }

  try {
    const normalized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/\s/g, '');

    const tokens = normalized.match(
      /(?:\d+(?:\.\d*)?|\.\d+)|[+\-*/]/g
    );

    if (!tokens || tokens.join('') !== normalized) {
      return 'Error';
    }

    const values = [];
    const operators = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (
        token === '-' &&
        (i === 0 || ['+', '-', '*', '/'].includes(tokens[i - 1]))
      ) {
        const next = tokens[++i];

        if (!next || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(next)) {
          return 'Error';
        }

        values.push(-Number(next));
      } else if (/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) {
        values.push(Number(token));
      } else {
        operators.push(token);
      }
    }

    if (values.length !== operators.length + 1) {
      return 'Error';
    }

    // Primero multiplicaciones y divisiones.
    for (let i = 0; i < operators.length; ) {
      if (operators[i] === '*' || operators[i] === '/') {
        const a = values[i];
        const b = values[i + 1];

        if (operators[i] === '/' && b === 0) {
          return 'Error';
        }

        const result =
          operators[i] === '*' ? a * b : a / b;

        values.splice(i, 2, result);
        operators.splice(i, 1);
      } else {
        i++;
      }
    }

    // Después sumas y restas.
    let result = values[0];

    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '+') {
        result += values[i + 1];
      } else if (operators[i] === '-') {
        result -= values[i + 1];
      } else {
        return 'Error';
      }
    }

    return Number.isFinite(result)
      ? String(Number(result.toFixed(10)))
      : 'Error';
  } catch (error) {
    return 'Error';
  }
}
