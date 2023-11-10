import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const MyModal = ({ modalTitle, children, button, hidenModal, textAux='' }) => {
    return (
        <View style={styles.backGround} >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleModal}>{modalTitle}</Text>
                    <TouchableOpacity
                        style={styles.exitButton}
                        onPress={() => hidenModal()}
                    >
                        <Ionicons size={20} color={'#F00'} name="close" />
                    </TouchableOpacity>
                </View>
                {children}
                <View>
                    {button}
                </View>
            </View>
            <View style={styles.viewTextAux}>
                <Text style={styles.textAux}>{textAux}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    container: {
        backgroundColor: '#FFF',
        width: '80%',
        padding: 30,
        borderRadius: 10
    },
    titleModal: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        textDecorationLine: 'underline'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewTextAux: {
        marginTop: 25,
    },
    textAux: {
        fontSize: 17,
    }
})

export default MyModal;