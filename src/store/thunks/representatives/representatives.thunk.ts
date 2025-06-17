import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetStorageObject} from '../../../utils/asyncStore.util';
import {enviroment} from '../../../constants/enviroment';
import axios from 'axios';
import {GetAccountData} from '../profile/profile.thunk';

export const sentRepresentativeRequest = createAsyncThunk(
  'representatives/sentRepresentativeRequest',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.post(
        `${enviroment.API_BASE_URL}/users/leader/`,
        config,
      );

      if (response.status === 201) {
        dispatch(GetAccountData());
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeRepresentativeStatus = createAsyncThunk(
  'representatives/removeRepresentativesStatus',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.delete(
        `${enviroment.API_BASE_URL}/users/leader/`,
        config,
      );

      if (response.status === 204) {
        dispatch(GetAccountData());
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateRepresentativeDetails = createAsyncThunk(
  'representative/updateRepresentativeDetails',
  async (about_me: string, {rejectWithValue, dispatch}) => {
    try {
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify({about_me});

      const response = await axios.put(
        `${enviroment.API_BASE_URL}/users/leader/`,
        body,
        config,
      );

      if (response.status === 200) {
        dispatch(GetAccountData());
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
