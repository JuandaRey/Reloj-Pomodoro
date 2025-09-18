import { Text, View, StyleSheet } from 'react-native';

export const Timer = ({time}) => {

    const FormatoTiempo = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;

    return (
        <View style={estilos.contenedor}>
            <Text style={estilos.time}>{FormatoTiempo}</Text>
        </View>
    )
}

    const estilos = StyleSheet.create({
        contenedor: {
            backgroundColor: '#fff',
            borderRadius: 50,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
        },
        time: {
            color: '#eb1616',
            fontSize: 60,
            fontWeight: "bold",
            textAlign: 'center',
        }
});