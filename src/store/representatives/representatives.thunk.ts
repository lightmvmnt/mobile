import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {environment} from '../../constants/environment';
import {GetAccountData} from '../profile/profile.thunk';
import {
  ChooseRepresentativeResponse,
  GetChosenRepresentativeIdResponse,
  Representative,
  RepresentativeDetails,
  UpdateChosenRepresentativeResponse,
} from './representatives.types';

export const getRepresentatives = createAsyncThunk(
  'representatives/getRepresentatives',
  async (search_query: string, {rejectWithValue}) => {
    try {
      const response = await axios.get<Representative[]>(
        `${environment.API_BASE_URL}/leaders?search=${search_query}`,
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

export const getRepresentativeDetails = createAsyncThunk(
  'representatives/getRepresentativeDetails',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<RepresentativeDetails>(
        `${environment.API_BASE_URL}/leaders/${id}`,
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

export const sentRepresentativeRequest = createAsyncThunk(
  'representatives/sentRepresentativeRequest',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.post(
        `${environment.API_BASE_URL}/leaders/`,
        {},
      );

      if (response.status === 201) {
        dispatch(GetAccountData());
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

export const removeRepresentativeStatus = createAsyncThunk(
  'representatives/removeRepresentativesStatus',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.delete(
        `${environment.API_BASE_URL}/leaders/`,
      );

      if (response.status === 204) {
        dispatch(GetAccountData());
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

export const updateRepresentativeDetails = createAsyncThunk(
  'representative/updateRepresentativeDetails',
  async (about_me: string, {rejectWithValue, dispatch}) => {
    try {
      const body = JSON.stringify({about_me});

      const response = await axios.put(
        `${environment.API_BASE_URL}/leaders/`,
        body,
      );

      if (response.status === 200) {
        dispatch(GetAccountData());
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

export const chooseRepresentative = createAsyncThunk(
  'representatives/chooseRepresentative',
  async (id: number, {rejectWithValue, dispatch}) => {
    try {
      const body = JSON.stringify({leader_user_id: id});

      const response = await axios.post<ChooseRepresentativeResponse>(
        `${environment.API_BASE_URL}/leaders/vote/`,
        body,
      );

      if (response.status === 201) {
        dispatch(getRepresentatives(''));
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

export const updateChosenRepresentative = createAsyncThunk(
  'representatives/updateChosenRepresentative',
  async (id: number, {rejectWithValue, dispatch}) => {
    try {
      const body = JSON.stringify({leader_user_id: id});

      const response = await axios.put<UpdateChosenRepresentativeResponse>(
        `${environment.API_BASE_URL}/leaders/vote/`,
        body,
      );

      if (response.status === 200) {
        dispatch(getRepresentatives(''));
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

export const removeChosenRepresentative = createAsyncThunk(
  'representatives/removeChosenRepresentative',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.delete(
        `${environment.API_BASE_URL}/leaders/vote/`,
      );

      if (response.status === 204) {
        dispatch(getRepresentatives(''));
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

export const getChosenRepresentativeId = createAsyncThunk(
  'representatives/getChosenRepresentativeId',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetChosenRepresentativeIdResponse>(
        `${environment.API_BASE_URL}/leaders/vote/`,
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
