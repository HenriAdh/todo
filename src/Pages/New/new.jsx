import { useState } from "react"
import { StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native"
import Button from "../../components/Button"
import useStorage from "../../hooks/database"

export const NewTask = () => {
    const { insertItem } = useStorage();
    const [formNewItem, setFormNewItem] = useState({title: '', desc: ''})

    const handleAddItem = async () => {
        if(formNewItem.desc === '' || formNewItem.title === '') return ToastAndroid.showWithGravity('Empty Field.', ToastAndroid.SHORT, ToastAndroid.CENTER,);
        const insert = await insertItem("@tasks", formNewItem)
        ToastAndroid.showWithGravity(insert, ToastAndroid.SHORT, ToastAndroid.CENTER, );
        setFormNewItem({title: '', desc: ''})
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Add new task</Text>

            <View style={styles.viewForm}>
                <View style={styles.margin}>
                    <TextInput
                        key={0}
                        style={[styles.input, styles.firstView]}
                        onChangeText={val => setFormNewItem({ ...formNewItem, title: val })}
                        value={formNewItem.title}
                        placeholder={'Title'}
                    />
                    <TextInput
                        key={1}
                        style={styles.input}
                        onChangeText={text => setFormNewItem({ ...formNewItem, desc: text })}
                        value={formNewItem.desc}
                        placeholder={'Description'}
                        multiline
                    />
                </View>
                <Button
                    text={'Add task'}
                    color={'green'}
                    icon={'add-outline'}
                    action={() => handleAddItem()} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0FBFC',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: 30,
        textDecorationLine: 'underline',
        marginBottom: 30,
    },
    input: {
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        backgroundColor: '#FFF',
        borderRadius: 8
    },
    margin: {
        marginBottom: 20
    },
    viewForm: {
        width: '80%'
    },
    firstView: {
        marginBottom: 5
    }
})