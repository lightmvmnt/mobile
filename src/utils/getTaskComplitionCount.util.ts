import axios from 'axios';
import {GetStorageObject} from './asyncStore.util';
import {enviroment} from './enviroment';

export const getTaskComplitionCount = async (task_id: number) => {
  try {
    const access_token = await GetStorageObject('access_token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    };

    const response = await axios.get<{count: number}>(
      `${enviroment.API_BASE_URL}/missions/count/${task_id}/`,
      config,
    );

    return {count: response.data.count};
  } catch (error) {
    return {count: 0};
  }
};
