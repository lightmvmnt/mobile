import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {environment} from '../../constants/environment';
import {
  GetCompletedTaskCountResponse,
  GetTaskPointsResponse,
  sendDeviceIdForTasksTypes,
  TaskResponse,
  UpdateTaskTypes,
} from './tasks.types';
import {GetStorageObject} from '../../utils/asyncStore.util';
import {User} from '../auth/auth.types';
import {getUserTotalPoints} from '../auth/auth.thunk';

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, {rejectWithValue}) => {
    try {
      const session_user: User = await GetStorageObject('user');

      const response = await axios.get<TaskResponse[]>(
        `${environment.API_BASE_URL}/missions/user/${session_user.id}/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const sendAndroidDeviceIdForTasks = createAsyncThunk(
  'tasks/sendAndroidDeviceIdForTasks',
  async ({device_id, token}: sendDeviceIdForTasksTypes, {rejectWithValue}) => {
    try {
      const body = JSON.stringify({
        name: '',
        registration_id: token,
        device_id,
        active: true,
        cloud_message_type: 'FCM',
        application_id: '',
      });

      const response = await axios.post(
        `${environment.API_BASE_URL}/missions/subscribe/gcm`,
        body,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const sendIosDeviceIdForTasks = createAsyncThunk(
  'tasks/sendIosDeviceIdForTasks',
  async ({device_id, token}: sendDeviceIdForTasksTypes, {rejectWithValue}) => {
    try {
      const body = JSON.stringify({
        name: '',
        registration_id: token,
        device_id,
        active: true,
        application_id: '',
      });

      const response = await axios.post(
        `${environment.API_BASE_URL}/missions/subscribe/apns`,
        body,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
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
      const body = JSON.stringify(updated_task);

      const response = await axios.put<TaskResponse>(
        `${environment.API_BASE_URL}/missions/${task_id}/`,
        body,
      );

      if (response.status === 200) {
        dispatch(getTasks());
        dispatch(getCompletedTaskCount());
        dispatch(getUserTotalPoints());
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getTask = createAsyncThunk(
  'tasks/getTask',
  async (task_id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<TaskResponse>(
        `${environment.API_BASE_URL}/missions/${task_id}/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getCompletedTaskCount = createAsyncThunk(
  'tasks/getCompletedTaskCount',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetCompletedTaskCountResponse>(
        `${environment.API_BASE_URL}/missions/user/count/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getTasksPoints = createAsyncThunk(
  'tasks/getTasksPoints',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetTaskPointsResponse[]>(
        `${environment.API_BASE_URL}/missions/points/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);
