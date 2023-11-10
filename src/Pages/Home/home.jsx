import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import MyModal from '../../components/Modal/modal';
import Button from '../../components/Button';
import Item from '../../components/itens/itens';
import useStorage from '../../hooks/database';
import { useIsFocused } from '@react-navigation/native';

export const Home = () => {
    const { getItens, removeItem, updateItem, insertItem } = useStorage();
    const isFocused = useIsFocused();
    const [listItens, setListitens] = useState([{ desc: '', title: '' }]);
    const [modalViewItem, setModalViewItem] = useState(false);
    const [actualItemId, setActualItemId] = useState(0);
    const [editingItem, setEditingItem] = useState(false);
    const [editItem, setEditItem] = useState('');
    const [isLoading, setLoading] = useState(true);

    const fetchItens = useCallback(async () => {
        const itens = await getItens("@tasks");
        setListitens(itens);
        setLoading(false);
    }, [])

    useEffect(() => {
        setLoading(true);
        fetchItens();
    }, [fetchItens, isFocused])

    const handleOpenItem = (id) => {
        setActualItemId(id);
        setModalViewItem(true);
    }

    const handleStartEditItem = () => {
        setEditItem(listItens[actualItemId].desc);
        setEditingItem(true);
    }

    const handleUpdateItem = async () => {
        const prev = [...listItens];
        prev[actualItemId].desc = editItem;
        await updateItem("@tasks", actualItemId, prev[actualItemId]);
        fetchItens();
        setEditItem('');
        setEditingItem(false);
    }

    const handleDeleteItem = async () => {
        await removeItem("@tasks", actualItemId);
        fetchItens();
        setEditingItem(false);
        setModalViewItem(false);
    }

    const handleFinishTask = async () => {
        await insertItem("@finishedTasks", listItens[actualItemId]);
        await removeItem("@tasks", actualItemId);
        fetchItens();
        setEditingItem(false);
        setModalViewItem(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Do</Text>

            {listItens.length > 0 ?
                listItens.map((item, i) => (
                    <TouchableOpacity
                        style={styles.listItem}
                        key={i}
                        onPress={() => handleOpenItem(i)}
                    >
                        <Item
                            title={item.title}
                        />
                    </TouchableOpacity>
                )) 
                : isLoading ? <ActivityIndicator size="small" color="#000" /> : <Text>No tasks pending.</Text>
            }
            <Modal visible={modalViewItem} animationType={'fade'} >
                <MyModal
                    modalTitle={listItens[actualItemId]?.title}
                    children={
                        <View>
                            {!editingItem ?
                                <View>
                                    <TouchableOpacity
                                        onLongPress={() => handleStartEditItem()}
                                    >
                                        <Text
                                            key={actualItemId}
                                            style={styles.modalText}
                                        >
                                            {listItens[actualItemId]?.desc}
                                        </Text>
                                    </TouchableOpacity>
                                    <Button
                                        propStyle={styles.buttonProp}
                                        text={'Finish task'}
                                        color={'blue'}
                                        icon={'checkbox-outline'}
                                        action={() => handleFinishTask()}
                                    />
                                </View>
                                : <TextInput
                                    style={styles.input}
                                    onChangeText={text => setEditItem(text)}
                                    value={editItem}
                                    placeholder={'Description'}
                                    multiline
                                />
                            }
                        </View>
                    }
                    button={!editingItem ?
                        <Button
                            text={'Delete item'}
                            icon={'trash-outline'}
                            color={'red'}
                            action={() => handleDeleteItem()}
                        /> : <Button
                            text={'Update item'}
                            color={'yellow'}
                            icon={'create-outline'}
                            action={() => handleUpdateItem()}
                        />
                    }
                    hidenModal={
                        () => {
                            setEditingItem(false);
                            setModalViewItem(false);
                        }
                    }
                    textAux='Tap and hold description to edit.'
                />
            </Modal>
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
    listItem: {
        backgroundColor: '#C2DFE3',
        width: '80%',
        padding: 10,
        marginVertical: 3,
        color: '#000',
        borderRadius: 15,
    },
    input: {
        padding: 3,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000'
    },
    modalText: {
        textAlign: 'justify',
        fontSize: 17
    },
    buttonProp: {
        marginTop: 30
    }
})

export default Home;