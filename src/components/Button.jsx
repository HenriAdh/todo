import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({text, color, action}) => {
    return (
        <TouchableOpacity
            style={[styles.button, styles[color]]}
            onPress={() => action()}
        >
            <Text style={styles.textButton}>{text}</Text>
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
})

export default Button;