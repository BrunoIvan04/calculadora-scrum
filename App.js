
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import { evaluate } from './src/logic/calculator';

export default function App() {
  const [operation, setOperation] = useState('');

  const handleKeyPress = (key) => {
    // Calcular el resultado al presionar =
    if (key === '=') {
      const result = evaluate(operation);
      setOperation(result);
      return;
    }

    // AC se implementará en la siguiente tarea.
    if (key === 'AC') {
      return;
    }

    // Evitar varios puntos decimales en un mismo número.
    if (key === '.') {
      const currentNumber = operation.split(/[+−×÷]/).pop();

      if (currentNumber.includes('.')) {
        return;
      }
    }

    // Evitar agregar números después de un error.
    if (operation === 'Error') {
      if (/^[0-9.]$/.test(key)) {
        setOperation(key);
      }
      return;
    }

    // Agregar números y operadores a la pantalla.
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
        <Text style={styles.title}>Calculadora Scrum</Text>
      </View>

      <View style={styles.display}>
        <Text style={styles.operation}>
          {operation || '0'}
        </Text>

        <Text style={styles.result}>0</Text>
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
                <Text style={styles.buttonText}>{key}</Text>
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
