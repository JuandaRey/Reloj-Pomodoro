import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import { Timer } from './componentes/Timer';
import { Header } from './componentes/Header';

const colores = ['#f7dc6f', '#4356ea', '#0bff1f', '#f7931e'];

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); 
  const [isWorking, setIsWorking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); 
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            setIsWorking((prev) => !prev);

            switch (currentTime) {
              case "POMO": 
                return (25 * 60);
              case "DESCANSO CORTO": 
                return (5 * 60);
              case "DESCANSO LARGO": 
                return (15 * 60);
              case "PERSONALIZADO": 
                return (parseInt(customTime) || 0) * 60;
              default:
                return prevTime;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, currentTime, customTime]);

  function handleStartStop() {
    setIsActive(!isActive);
  }

  return (
    <View style={[styles.container, { backgroundColor: colores[currentTime] }]}>
      <Text style={styles.text}>Pomodoro</Text>

      <Header
        setTime={setTime}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        customTime={customTime}
        setCustomTime={setCustomTime}
      />

      {currentTime === 3 && (
        <View style={styles.customInputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric" // Muestra teclado numérico en móviles
            value={customTime} // Valor del input controlado por el estado customTime
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, ''); // Elimina todo lo que no sea dígito (ej: letras, puntos, etc.)
              setCustomTime(numericText); // Actualiza el estado del input con solo los números
              setTime((parseInt(numericText) || 0) * 60);
            }}
          />
        </View>
      )}

      <Timer time={time} />

      <TouchableOpacity onPress={handleStartStop} style={styles.boton}>
        <Text style={styles.textboton}>{isActive ? 'STOP' : 'START'}</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  boton: {
    marginTop: 20,
    backgroundColor: '#eb1616',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  textboton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  customInputContainer: {
    alignItems: 'center',
    padding: 20,
    gap: 15,
    marginVertical: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    width: 80,
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
});
