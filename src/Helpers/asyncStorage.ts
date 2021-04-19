import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadFromStorage = async <T>(key: string) => {
	const loaded = await AsyncStorage.getItem(key);
	console.log(`Loaded ${key}`);
	return loaded ? (JSON.parse(loaded) as T) : null;
};
export const saveToStorage = (toSave: any | null, key: string) => {
	AsyncStorage.setItem(key, JSON.stringify(toSave));
	console.log(`Saved ${key} - ${toSave}`);
};

// TODO : implement this
export const secureSaveToStorage = () => {};
