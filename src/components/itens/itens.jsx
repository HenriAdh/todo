import { Text, View, StyleSheet } from "react-native";

const Item = ({ title }) => {
    return (
        <View style={styles.field}>
            <Text style={styles.listItemText} >{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    listItemText: {
        fontSize: 20,
        textAlign: 'center',
        width: '80%',
        textAlignVertical: 'center',
        color: '#000',
        padding: 5,
    },
})

export default Item;