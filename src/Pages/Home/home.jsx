import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import MyModal from '../../components/Modal/modal';
import Button from '../../components/Button';
import Item from './components/Itens';

const Home = () => {
    const [listItens, setListitens] = useState([{ desc: '', title: '' }]);
    const [modalNewItem, setModalNewItem] = useState(false);
    const [modalViewItem, setModalViewItem] = useState(false);
    const [formNewItem, setFormNewItem] = useState({ title: '', desc: '' });
    const [actualItemId, setActualItemId] = useState(0);
    const [itensChecked, setItensChecked] = useState([]);
    const [editingItem, setEditingItem] = useState(false);
    const [editItem, setEditItem] = useState('');

    const fetchItens = () => [
        {
            title: 'Cozinhar',
            desc: 'Preparar arroz, feijão e mistura para a marmita.',
        }, {
            title: 'Arrumar a cama',
            desc: 'Dobrar a coberta e esticar o lençol após se levantar.',
        }, {
            title: 'Tomar banho',
            desc: 'Se limpar após um longo dia cansativo para recuperar as energias.',
        },
    ]

    const handleAddItem = () => {
        setListitens([...listItens, { ...formNewItem }]);
        setFormNewItem({ title: '', desc: '' });
        setModalNewItem(false);
    }

    const handleDeleteItem = () => {
        const prev = listItens;
        prev.splice(actualItemId, 1);
        setListitens(prev);
        setModalViewItem(false);
    }

    const handleOpenItem = (id) => {
        setActualItemId(id)
        setModalViewItem(true)
    }

    const handleNewItem = () => {
        setModalNewItem(true);
    }

    const handleStartEditItem = () => {
        setEditingItem(true);
    }

    const handleUpdateItem = () => {
        let prev = [...listItens];
        prev[actualItemId].desc = editItem;

        setListitens(prev);
        setEditItem('');
        setEditingItem(false);
    }

    const handleFinishTasks = () => {
        itensChecked.map(item => (
            console.log(item)
        ))
    }

    const handleToggleCheck = (id) => {
        let tempList = [...itensChecked];
        tempList[id] = tempList[id] ? false : true
        setItensChecked(tempList);
    }

    useEffect(() => {
        setListitens(fetchItens())
    }, [])

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
                            onToggleCheck={() => handleToggleCheck(i)}
                        />
                    </TouchableOpacity>
                )) : <ActivityIndicator size="small" color="#000" />
            }

            <Button
                text={'New item'}
                color={'green'}
                action={() => handleNewItem()}
            />

            {itensChecked.includes(true) ? (
                <Button
                    text={'Finish tasks'}
                    color={'blue'}
                    action={() => handleFinishTasks()}
                />
            ) : (
                <></>
            )}

            <Modal visible={modalNewItem} animationType={'fade'} >
                <MyModal
                    modalTitle={'Add New Item'}
                    children={
                        <View style={styles.margin}>
                            <TextInput
                                key={0}
                                style={[styles.input, { marginBottom: 5 }]}
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
                    }
                    button={
                        <Button
                            text={'Add'}
                            color={'green'}
                            action={() => handleAddItem()}
                        />
                    }
                    hidenModal={() => setModalNewItem(false)}
                />
            </Modal>
            <Modal visible={modalViewItem} animationType={'fade'} >
                <MyModal
                    modalTitle={listItens[actualItemId]?.title}
                    children={
                        <View>
                            {!editingItem ?
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
                                : <TextInput
                                    style={styles.input}
                                    onChangeText={text => setEditItem(text)}
                                    value={listItens[actualItemId]?.desc}
                                    placeholder={'Description'}
                                    multiline
                                />
                            }
                        </View>
                    }
                    button={ editingItem ? 
                        <Button
                            text={'Delete item'}
                            color={'red'}
                            action={() => handleDeleteItem()}
                        /> : <Button
                            text={'Update item'}
                            color={'yellow'}
                            action={() => handleUpdateItem()}
                        />
                    }
                    hidenModal={() => setModalViewItem(false)}
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
    margin: {
        marginBottom: 20
    },
})

export default Home;