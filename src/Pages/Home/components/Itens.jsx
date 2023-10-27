import { useState } from "react";
import { Switch, Text, View, StyleSheet } from "react-native";

const Item = ({ title, onToggleCheck }) => {
    const [check, setCheck] = useState(false);

    const toggleCheck = () => {
        setCheck(prev => !prev);
        onToggleCheck();
    }

    return (
        <View style={styles.field}>
            <Switch 
                trackColor={{false: '#00000080', true: '#3EC70B80'}}
                thumbColor={check ? '#3EC70B' : '#000'}
                value={check}
                onChange={() => toggleCheck()}
            />
            <Text style={styles.listItemText}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row'
    },
    listItemText: {
        fontSize: 20,
        textAlign: 'center',
        width: '80%',
        textAlignVertical: 'center',
        color: '#000',
    },
})

export default Item;