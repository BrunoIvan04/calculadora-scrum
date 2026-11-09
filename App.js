
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import { evaluate } from './src/logic/calculator';
import { deleteLastChar } from './src/logic/input';

// Teclas que todavía no tienen funcionalidad en este Sprint.
const PENDING_KEYS = ['%', '±'];

export default function App() {
  // Operación que el usuario está capturando (RF-04).
  const [operation, setOperation] = useState('');
  // Último resultado, mostrado en un área independiente (RF-05).
  const [result, setResult] = useState('0');

  const handleKeyPress = (key) => {
    // SCRUM-21: limpiar captura y resultado.
    if (key === 'AC') {
      setOperation('');
      setResult('0');
      return;
    }

    // SCRUM-20: calcular con la lógica de SCRUM-16, mostrar
    // operación y resultado, y limpiar la captura (RF-06, RF-13).
    if (key === '=') {
      if (!operation) {
        return;
      }

      try {
        const value = evaluate(operation);
        setResult(`${operation} = ${value}`);
      } catch (error) {
        setResult(error.message);
      }

      setOperation('');
      return;
    }

    // SCRUM-22: borrar el último carácter capturado.
    if (key === '⌫') {
      setOperation((previous) => deleteLastChar(previous));
      return;
    }

    if (PENDING_KEYS.includes(key)) {
      return;
    }

    // Evitar varios puntos decimales en un número.
    if (key === '.') {
      const currentNumber = operation.split(/[+−×÷]/).pop();

      if (currentNumber.includes('.')) {
        return;
      }
    }

    // Agregar números y operadores.
    setOperation((previous) => previous + key);
  };

  const keys = [
    ['AC', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['±', '0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>
          Calculadora Scrum
        </Text>
      </View>

      <View style={styles.display}>
        <Text style={styles.operation}>
          {operation || '0'}
        </Text>

        <Text style={styles.result} numberOfLines={2} adjustsFontSizeToFit>
          {result}
        </Text>
      </View>

      <View style={styles.keyboard}>
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((key) => (
              <Pressable
                key={key}
                onPress={() => handleKeyPress(key)}
                style={({ pressed }) => [
                  styles.button,
                  ['÷', '×', '−', '+', '='].includes(key) &&
                    styles.operatorButton,
                  key === 'AC' && styles.clearButton,
                  pressed && styles.pressedButton,
                ]}
              >
                <Text style={styles.buttonText}>
                  {key}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101218',
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 35,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  display: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  operation: {
    color: '#9297A3',
    fontSize: 26,
  },
  result: {
    color: '#FFFFFF',
    fontSize: 58,
    fontWeight: 'bold',
  },
  keyboard: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 65,
    borderRadius: 18,
    backgroundColor: '#292D38',
    alignItems: 'center',
    justifyContent: 'center',
  },
  operatorButton: {
    backgroundColor: '#375B95',
  },
  clearButton: {
    backgroundColor: '#A44444',
  },
  pressedButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '600',
  },
});
