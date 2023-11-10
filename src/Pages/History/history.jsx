import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Item from "../../components/itens/itens";
import useStorage from "../../hooks/database";
import MyModal from "../../components/Modal/modal";
import { useIsFocused } from '@react-navigation/native';

export const HistoryTask = () => {
    const { getItens } = useStorage();
    const isFocused = useIsFocused();
    const [listItens, setListItens] = useState([]);
    const [modalViewItem, setModalViewItem] = useState(false);
    const [actualItemId, setActualItemId] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const handleOpenItem = (id) => {
        setActualItemId(id)
        setModalViewItem(true)
    }

    const fetchItens = useCallback(async () => {
        const itens = await getItens("@finishedTasks");
        itens.reverse();
        setListItens(itens)
        setLoading(false);
    }, [])

    useEffect(() => {
        setLoading(true);
        fetchItens();
    }, [fetchItens, isFocused]);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Finished Tasks</Text>

            {listItens.length > 0 ?
                listItens.map((item, i) => (
                    <TouchableOpacity
                        style={styles.listItem}
                        key={i}
                        onPress={() => handleOpenItem(i)}
                    >
                        <Item
                            title={item?.title}
                        />
                    </TouchableOpacity>
                )) : isLoading ? <ActivityIndicator size="small" color="#000" /> : <Text>No tasks finished</Text>
            }
            <Modal visible={modalViewItem} animationType={'fade'} >
                <MyModal
                    modalTitle={listItens[actualItemId]?.title}
                    children={
                        <View>
                            <Text
                                key={actualItemId}
                                style={styles.modalText}
                            >
                                {listItens[actualItemId]?.desc}
                            </Text>
                        </View>
                    }
                    hidenModal={
                        () => setModalViewItem(false)
                    }
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
    modalText: {
        textAlign: 'justify',
        fontSize: 17
    },
})