import axios from 'axios';

import {environment} from '../../constants/environment';

export const getTaskComplitionCount = async (task_id: number) => {
  try {
    const response = await axios.get<{count: number}>(
      `${environment.API_BASE_URL}/missions/count/${task_id}/`,
    );

    return {count: response.data.count};
  } catch (error) {
    return {count: 0};
  }
};
