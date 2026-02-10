import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {environment} from '../../constants/environment';
import {getUserReferralCountResponse} from './referral.types';

export const getUserReferralCount = createAsyncThunk(
  'user/getUserReferralCount',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<getUserReferralCountResponse>(
        `${environment.API_BASE_URL}/users/referral/count/`,
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

export const sendReferrerId = createAsyncThunk(
  'user/sendReferrerId',
  async (id: string, {rejectWithValue}) => {
    try {
      const body = JSON.stringify({
        referrer_user: parseInt(id),
      });

      const response = await axios.post(
        `${environment.API_BASE_URL}/users/referral/`,
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
