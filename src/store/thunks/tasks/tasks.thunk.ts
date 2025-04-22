import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {enviroment} from '../../../constants/enviroment';
import {
  GetCompletedTaskCountResponse,
  GetTaskPointsResponse,
  sendDeviceIdForTasksTypes,
  TaskResponse,
  UpdateTaskTypes,
} from './tasks.types';
import {GetStorageObject} from '../../../utils/asyncStore.util';
import {User} from '../auth/auth.types';
import {getUserTotalPoints} from '../auth/auth.thunk';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, {rejectWithValue}) => {
    try {
      const session_user: User = await GetStorageObject('user');

      const response = await axios.get<TaskResponse[]>(
        `${enviroment.API_BASE_URL}/missions/user/${session_user.id}/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const sendAndroidDeviceIdForTasks = createAsyncThunk(
  'tasks/sendAndroidDeviceIdForTasks',
  async (
    {session_token, device_id, access_token, token}: sendDeviceIdForTasksTypes,
    {rejectWithValue},
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': session_token,
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify({
        name: '',
        registration_id: token,
        device_id,
        active: true,
        cloud_message_type: 'FCM',
        application_id: '',
      });

      const response = await axios.post(
        `${enviroment.API_BASE_URL}/missions/subscribe/gcm`,
        body,
        config,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const sendIosDeviceIdForTasks = createAsyncThunk(
  'tasks/sendIosDeviceIdForTasks',
  async (
    {session_token, device_id, access_token, token}: sendDeviceIdForTasksTypes,
    {rejectWithValue},
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': session_token,
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify({
        name: '',
        registration_id: token,
        device_id,
        active: true,
        application_id: '',
      });

      const response = await axios.post(
        `${enviroment.API_BASE_URL}/missions/subscribe/apns`,
        body,
        config,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    {task_id, updated_task}: UpdateTaskTypes,
    {rejectWithValue, dispatch},
  ) => {
    try {
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify(updated_task);

      const response = await axios.put<TaskResponse>(
        `${enviroment.API_BASE_URL}/missions/${task_id}/`,
        body,
        config,
      );

      if (response.status === 200) {
        dispatch(getTasks());
        dispatch(getCompletedTaskCount());
        dispatch(getUserTotalPoints());
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTask = createAsyncThunk(
  'tasks/getTask',
  async (task_id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<TaskResponse>(
        `${enviroment.API_BASE_URL}/missions/${task_id}/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getCompletedTaskCount = createAsyncThunk(
  'tasks/getCompletedTaskCount',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetCompletedTaskCountResponse>(
        `${enviroment.API_BASE_URL}/missions/user/count/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTasksPoints = createAsyncThunk(
  'tasks/getTasksPoints',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetTaskPointsResponse[]>(
        `${enviroment.API_BASE_URL}/missions/points/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
