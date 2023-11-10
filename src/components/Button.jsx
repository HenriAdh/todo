import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Button = ({text, color, action, propStyle={}, icon=undefined}) => {
    return (
        <TouchableOpacity
            style={[styles.button, styles[color], propStyle]}
            onPress={() => action()}
        >
            <Text style={styles.textButton}>{icon ? <Ionicons size={17} color={'#FFF'} name={icon} /> : <></>} {text}</Text>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    textButton: {
        fontSize: 17,
        color: '#FFF',
        textAlign: 'center'
    },
    green: {
        backgroundColor: '#3EC70B',
    },
    red: {
        backgroundColor: '#C70B3E',
    },
    blue: {
        backgroundColor: '#0B3EC7'
    },
    yellow: {
        backgroundColor: '#F7C70B'
    },
})

export default Button;