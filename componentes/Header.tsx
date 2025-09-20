import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';

const opciones = ["Pomodoro", "Descanso Corto", "Descanso Largo", "Personalizado"];

export const Header = ({ setTime, currentTime, setCurrentTime }) => {
    const [customTime, setCustomTime] = useState('');

    function handlePress(index) {
        console.log(index);
        if (index === opciones.length - 1) {
            setCurrentTime(index);
        } else {
            const newTime = (index === 0 ? 25 : (index === 1 ? 5 : 15));
            console.log(newTime);
            setCurrentTime(index);
            setTime(newTime * 60);
        }
    }

    function handleCustomTime() {
        const parsedTime = parseInt(customTime);
        if (!isNaN(parsedTime) && parsedTime > 0) {
            setTime(parsedTime * 60);
            setCurrentTime(opciones.length - 1);
        }
        setCustomTime('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                {opciones.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(index)}
                        style={[
                            styles.itemStyle,
                            currentTime !== index && { borderColor: "transparent" }
                        ]}
                    >
                        <Text style={{ fontWeight: "bold" }}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
                    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
        marginVertical: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    itemStyle: {
        borderWidth: 3,
        padding: 5,
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 15,
        alignItems: "center",
        borderColor: "white"
    },
   
});