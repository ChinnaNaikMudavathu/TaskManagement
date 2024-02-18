import {MMKV} from 'react-native-mmkv';

export enum AsyncStorageKeys {
  'TASKS' = 'TASKS',
}

export const AsyncStorage = new MMKV();

export const storeAsyncStorageData = (key: string, data: any) => {
  try {
    if (key) {
      AsyncStorage.set(key, JSON.stringify(data));
    }
  } catch (e: any) {
    console.log('Error while fetching data from local storage', JSON.parse(e));
  }
};

export const getAsyncStorageData = (key: string) => {
    try {
      if (key) {
        const localStorageData = AsyncStorage.getString(key);
        return JSON.parse(localStorageData ?? '[]' as string)
      }
    } catch (e: any) {
      console.log('Error while fetching data from local storage', JSON.parse(e));
      return []
    }
  };
