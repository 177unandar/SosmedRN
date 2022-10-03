import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeToLocalStorage = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}

export const getFromLocalStorage = async (key: string): Promise<string | undefined> => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value;
        }
    } catch (e) {
        // error reading value
    }
}

export const removeFromLocalStorage = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // error reading value
    }
}