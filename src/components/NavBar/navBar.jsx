import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NavBar = ({ menus, onPress=()=>{} }) => {
    const [selected, setSelected] = useState(0);

    return (
        <View style={styles.container}>
            {
                menus.map((menu, i) => (
                    <TouchableOpacity key={i}
                        style={selected === i ? styles.selectedButton : styles.button}
                        onPress={()=>{setSelected(i); onPress}}
                    >
                        <Text style={styles.buttonText}>{menu.text}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        top: '90%'
    },
    button: {
        padding: 6,
        backgroundColor: '#5F5F5F',
        color: '#000',
        borderRadius: 15
    },
    selectedButton: {
        borderRadius: 15,
        padding: 6,
        backgroundColor: '#5F5FFF',
        color: '#000'
    },
    buttonText: {
        padding: 6,
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    }
})

export default NavBar;
