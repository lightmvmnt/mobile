import axios from 'axios';
import {enviroment} from '../../constants/enviroment';

export const getTaskComplitionCount = async (task_id: number) => {
  try {
    const response = await axios.get<{count: number}>(
      `${enviroment.API_BASE_URL}/missions/count/${task_id}/`,
    );

    return {count: response.data.count};
  } catch (error) {
    return {count: 0};
  }
};
