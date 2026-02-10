import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetStorageObject = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value !== null ? JSON.parse(value) : null;
  } catch (error: unknown) {
    return null;
  }
};

export const SetStorageObjectValue = async (key: string, value: unknown) => {
  try {
    const result_value = JSON.stringify(value);

    await AsyncStorage.setItem(key, result_value);
  } catch (error: unknown) {
    return;
  }
};

export const RemoveStorageValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error: unknown) {
    return;
  }
};
