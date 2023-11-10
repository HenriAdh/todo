import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    const getItens = async (key) => {
        try{
            const itens = await AsyncStorage.getItem(key);
            return JSON.parse(itens) || [];
        } catch (e) {
            console.log(e)
            return [];
        }
    }
    const insertItem = async (key, value) => {
        try{
            const tasks = await getItens(key);
            tasks.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(tasks));
            return 'Success on insert!';
        } catch (e) {
            console.log(e);
            return 'Error on insert.';
        }
    }

    const updateItem = async (key, id, value) => {
        try{
            const tasks = await getItens(key);
            tasks[id] = {...value};
            await AsyncStorage.setItem(key, JSON.stringify(tasks))
            return 'Success on update!'
        } catch (e) {
            console.log(e);
            return 'Error on update.'
        }
    }

    const removeItem = async (key, id) => {
        try{
            const tasks = await getItens(key);
            tasks.splice(id, 1)
            await AsyncStorage.setItem(key, JSON.stringify(tasks))
            return tasks;
        } catch (e) {
            console.log(e);
            return []
        }
    }
    
    return {
        getItens,
        insertItem,
        updateItem,
        removeItem,
    }
}

export default useStorage;