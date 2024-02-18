import { MMKV } from 'react-native-mmkv';

export enum AsyncStorageKeys {
    'TASKS' = 'TASKS'
}

export const AsyncStorage = new MMKV();

