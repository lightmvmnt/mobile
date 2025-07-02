import {createAsyncThunk} from '@reduxjs/toolkit';
import {GetStorageObject} from '../../../utils/asyncStore.util';
import {enviroment} from '../../../constants/enviroment';
import axios from 'axios';
import {GetAccountData} from '../profile/profile.thunk';
import {
  ChooseRepresentativeResponse,
  GetChosenRepresentativeIdResponse,
  GetRepresentativeDetailsResponse,
  GetRepresentativesResponse,
  UpdateChosenRepresentativeResponse,
} from './representatives.types';

export const getRepresentatives = createAsyncThunk(
  'representatives/getRepresentatives',
  async (search_query: string, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetRepresentativesResponse[]>(
        `${enviroment.API_BASE_URL}/users/leaders?search=${search_query}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getRepresentativeDetails = createAsyncThunk(
  'representatives/getRepresentativeDetails',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetRepresentativeDetailsResponse>(
        `${enviroment.API_BASE_URL}/users/leader/${id}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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

export const chooseRepresentative = createAsyncThunk(
  'representatives/chooseRepresentative',
  async (id: number, {rejectWithValue, dispatch}) => {
    try {
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify({
        leader_user_id: id,
      });

      const response = await axios.post<ChooseRepresentativeResponse>(
        `${enviroment.API_BASE_URL}/users/leader/vote/`,
        body,
        config,
      );

      if (response.status === 201) {
        dispatch(getRepresentatives(''));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateChosenRepresentative = createAsyncThunk(
  'representatives/updateChosenRepresentative',
  async (id: number, {rejectWithValue, dispatch}) => {
    try {
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify({
        leader_user_id: id,
      });

      const response = await axios.put<UpdateChosenRepresentativeResponse>(
        `${enviroment.API_BASE_URL}/users/leader/vote/`,
        body,
        config,
      );

      if (response.status === 200) {
        dispatch(getRepresentatives(''));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeChosenRepresentative = createAsyncThunk(
  'representatives/removeChosenRepresentative',
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
        `${enviroment.API_BASE_URL}/users/leader/vote/`,
        config,
      );

      if (response.status === 204) {
        dispatch(getRepresentatives(''));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getChosenRepresentativeId = createAsyncThunk(
  'representatives/getChosenRepresentativeId',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetChosenRepresentativeIdResponse>(
        `${enviroment.API_BASE_URL}/users/leader/vote/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
