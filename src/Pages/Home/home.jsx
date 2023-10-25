import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Switch, TouchableOpacity, Modal, TextInput } from 'react-native';
import MyModal from '../../components/Modal/modal';

const Home = () => {
    const [listItens, setListitens] = useState([{desc: ''}]);
    const [modalNewItem, setModalNewItem] = useState(false);
    const [modalViewItem, setModalViewItem] = useState(false);

    const [formNewItem, setFormNewItem] = useState({title: '', desc: ''});
    const [actualItemId, setActualItemId] = useState(0);

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
        setListitens([...listItens, {...formNewItem}]);
        setFormNewItem({title: '', desc: ''});
        setModalNewItem(false);
    }

    const handleDeleteItem = () => {
        const prev = listItens;
        prev.splice(actualItemId, 1);
        setListitens(prev);
        setModalViewItem(false);
    }

    const inputsNewItem = [
        <TextInput
            key={0}
            style={[styles.input, {marginBottom: 5}]}
            onChangeText={val => setFormNewItem({...formNewItem, title: val})}
            value={formNewItem.title}
            placeholder={'Title'}
        />,
        <TextInput 
            key={1}
            style={styles.input}
            onChangeText={text => setFormNewItem({...formNewItem, desc: text})}
            value={formNewItem.desc}
            placeholder={'Description'}
            multiline
        />
    ]

    const buttonNewItem = (    
        <TouchableOpacity
            style={[styles.button, styles.green]}
            onPress={() => handleAddItem()}
        >
            <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
    )

    const textsViewItem = [
        <Text key={actualItemId} style={styles.modalText}>{listItens[actualItemId]?.desc}</Text>
    ]

    const buttonViewItem = (
        <TouchableOpacity
            style={[styles.button, styles.red]}
            onPress={() => handleDeleteItem()}
        >
            <Text style={styles.textButton}>Delete Item</Text>
        </TouchableOpacity>
    )

    useEffect(()=>{
        setListitens(fetchItens())
    }, [])

    const handleOpenItem = (id) => {
        setActualItemId(id)
        setModalViewItem(true)
    }

    const handleNewItem = () => {
        setModalNewItem(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To-Do</Text>
            {listItens.map((item, i) => (
                <TouchableOpacity
                    style={styles.listItem}
                    key={i}
                    onPress={() => handleOpenItem(i)}
                >
                    <Item title={item.title} />
                </TouchableOpacity>
            ))}
            <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => handleNewItem()}
            >
                <Text style={styles.textButton}>New Item</Text>
            </TouchableOpacity>
            <Modal visible={modalNewItem}>
                <MyModal modalTitle={'Add New Item'} inputs={inputsNewItem} button={buttonNewItem} hidenModal={()=>setModalNewItem(false)} />
            </Modal>
            <Modal visible={modalViewItem}>
                <MyModal modalTitle={listItens[actualItemId]?.title} labels={textsViewItem} button={buttonViewItem} hidenModal={()=>setModalViewItem(false)} />
            </Modal>
        </View>
    )
}

const Item = ({ title }) => {
    const [check, setCheck] = useState(false);
    const toggleCheck = () => setCheck(prev => !prev);

    return(
        <View style={styles.field}>
            <Switch 
                trackColor={{false: '#00000080', true: '#3EC70B80'}}
                thumbColor={check ? '#3EC70B' : '#000'}
                value={check}
                onValueChange={() => toggleCheck()}
            />
                <Text style={styles.listItemText}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD',
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
        backgroundColor: '#F7EC09',
        width: '80%',
        padding: 10,
        marginVertical: 3,
        color: '#000',
        borderRadius: 15,
    },
    listItemText: {
        fontSize: 20,
        textAlign: 'center',
        width: '80%',
        textAlignVertical: 'center'
    },
    field: {
        flexDirection: 'row'
    },
    button: {
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    green: {
        backgroundColor: '#3EC70B',
    },
    red: {
        backgroundColor: '#C70B3E',
    },
    textButton: {
        fontSize: 17,
        color: '#FFF',
        textAlign: 'center'
    },
    input: {
        padding: 3,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000'
    },
    modalText: {
        textAlign: 'justify',
        fontSize: 17
    }
})

export default Home;