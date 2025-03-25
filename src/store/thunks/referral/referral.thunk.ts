import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {enviroment} from '../../../constants/enviroment';
import {getUserReferralCountResponse} from './referral.types';
import {GetStorageObject} from '../../../utils/asyncStore.util';

export const getUserReferralCount = createAsyncThunk(
  'user/getUserReferralCount',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<getUserReferralCountResponse>(
        `${enviroment.API_BASE_URL}/users/referral/count/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const sendReferrerId = createAsyncThunk(
  'user/sendReferrerId',
  async (id: string, {rejectWithValue}) => {
    try {
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      console.log(id, 'gagzavnisass');

      const body = JSON.stringify({
        referrer_user: parseInt(id),
      });

      console.log(body);

      const response = await axios.post(
        `${enviroment.API_BASE_URL}/users/referral/`,
        body,
        config,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
