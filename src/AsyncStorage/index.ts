import {MMKV} from 'react-native-mmkv';

export enum AsyncStorageKeys {
  'TASKS' = 'TASKS',
  'IS_USER_AWARE_OF_SWIPE_TO_DELETE_TASK' = 'IS_USER_AWARE_OF_SWIPE_TO_DELETE_TASK'
}

export const AsyncStorage = new MMKV();

export const storeAsyncStorageData = (key: string, data: any) => {
  try {
    if (key) {
      let localStorageData = data;
      if(typeof data !== 'string' ||  typeof data !== 'boolean'){
        localStorageData = JSON.stringify(data);
      }
      AsyncStorage.set(key, localStorageData);
    }
  } catch (e: any) {
    console.log('Error while fetching data from local storage', JSON.parse(e));
  }
};

export const getAsyncStorageData = (key: string) => {
    try {
      if (key) {
        const localStorageData = AsyncStorage.getString(key);
        return JSON.parse(localStorageData ?? 'null' as string)
      }
    } catch (e: any) {
      console.log('Error while fetching data from local storage', JSON.parse(e));
      return null
    }
  };
