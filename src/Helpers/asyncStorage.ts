import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from '~/config/constants';

export const loadFromStorage = async <T = string>(key: string) => {
	console.log(`Loaded ${key}`);
	let loaded;
	try {
		const secureStoreIsAvailable = await SecureStore.isAvailableAsync();
		if (key === TOKEN_KEY && secureStoreIsAvailable) {
			loaded = await SecureStore.getItemAsync(key);
			return loaded as unknown as T;
		}
		loaded = await AsyncStorage.getItem(key);
	} catch (error) {
		console.log(error);
	}
	console.log(`Loaded ${loaded}`);
	return loaded ? (JSON.parse(loaded) as T) : null;
};
export const saveToStorage = (toSave: any | null, key: string) => {
	if (key === TOKEN_KEY && toSave === null) {
		SecureStore.deleteItemAsync(key);
		return;
	}
	if (key === TOKEN_KEY) {
		SecureStore.setItemAsync(key, toSave);
		console.log(`Securely Saved ${key} - ${toSave}`);
		return;
	}
	AsyncStorage.setItem(key, JSON.stringify(toSave));
	console.log(`Saved ${key} - ${JSON.stringify(toSave)}`);
};
