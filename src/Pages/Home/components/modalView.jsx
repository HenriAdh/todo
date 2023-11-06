import { Text, TouchableOpacity, View } from "react-native"
import MyModal from "../../../components/Modal/modal"
import Button from "../../../components/Button"

const ModalView = ({
    
}) => {
    return (
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
    )
}