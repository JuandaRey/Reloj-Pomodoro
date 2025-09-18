import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Timer } from './componentes/Timer';

export default function App() {

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(1500);

  function handleStartStop(){
    setIsActive(!isActive)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pomodoro</Text>
      <Timer time={time}/>
      <TouchableOpacity onPress={() => setIsActive(!isActive)} style={styles.boton}>
        <Text style={styles.textboton}>{isActive ? "STOP":"START"}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 60,
    fontWeight: "bold"
  },
  boton:{
    marginTop: 20,
    backgroundColor: '#eb1616ff',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  textboton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "100"
  }
});
