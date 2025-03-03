import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetStorageObject = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    return error;
  }
};

export const SetStorageObjectValue = (key: string, value: any) => {
  try {
    const result_value = JSON.stringify(value);

    AsyncStorage.setItem(key, result_value);
  } catch (error) {
    return error;
  }
};

export const RemoveStorageValue = (key: string) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) {
    return error;
  }
};
