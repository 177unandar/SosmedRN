import { LoginResponse } from "../../api/response/LoginResponse";
import { User } from "../../models/User"
import { getFromLocalStorage, removeFromLocalStorage, storeToLocalStorage } from "./LocalStorage";

const KEY_USER = 'token';
const KEY_TOKEN = 'user';

export const getSessionToken = async (): Promise<string | undefined> => {
    return await getFromLocalStorage(KEY_TOKEN);
}

export const getLogedUser = async (): Promise<User | null> => {
    let strJson = await getFromLocalStorage(KEY_USER);
    if (strJson!! && strJson?.length > 0) {
        return JSON.parse(strJson) as User;
    }
    return null;
}

export const saveSession = async (token: string, user: User) => {
    await Promise.all([
        await storeToLocalStorage(KEY_TOKEN, token),
        await storeToLocalStorage(KEY_USER, JSON.stringify(user)),
    ]);
}

export const saveSessionFromResponse = async (response: LoginResponse) => {
    await saveSession(response.token, response.user);
}

export const clearSession = async () => {
    await Promise.all([
        await removeFromLocalStorage(KEY_TOKEN),
        await removeFromLocalStorage(KEY_USER),
    ]);
}