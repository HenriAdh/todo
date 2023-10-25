import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const MyModal = ({ modalTitle, inputs=[], labels=[], button, hidenModal}) => {
    return (
        <View style={styles.backGround} >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleModal}>{modalTitle}</Text>
                    <TouchableOpacity
                        style={styles.exitButton}
                        onPress={() => hidenModal()}
                    >
                        <Text style={styles.exitButtonText}>x</Text>
                    </TouchableOpacity>
                </View>
                {inputs.length > 0 && 
                    <View style={styles.margin} > 
                        { inputs.map( input => input ) }
                    </View>
                }
                {labels.length > 0 &&
                    <View style={styles.margin} >
                        { labels.map( label => label) }
                    </View>
                }
                <View>
                    {button}
                </View>
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
        flexDirection: 'row',
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
    margin: {
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    exitButtonText: {
        fontSize: 20,
        padding: 5
    }

})

export default MyModal;