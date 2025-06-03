import {createAsyncThunk} from '@reduxjs/toolkit';
import {enviroment} from '../../../constants/enviroment';
import axios from 'axios';
import {
  Account,
  UserSocialsResponse,
  SocialTypes,
  UpdateAccountPayload,
  FacebookConnectPayload,
  FacebookConnectResponse,
  connectFacebookProfileParams,
} from './profile.types';
import {GetStorageObject} from '../../../utils/asyncStore.util';
import {NavigationProps} from '../../../services/navigation/Base.navigation';

export const GetAccountData = createAsyncThunk(
  'profile/GetAccountData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<Account>(
        `${enviroment.API_BASE_URL}/users/me/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateAccount = createAsyncThunk(
  'profile/updateAccount',
  async (
    {
      updated_account,
      navigation,
    }: {updated_account: UpdateAccountPayload; navigation: NavigationProps},
    {rejectWithValue},
  ) => {
    try {
      const session_token = await GetStorageObject('session_token');
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': session_token,
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify(updated_account);

      const response = await axios.patch<Account>(
        `${enviroment.API_BASE_URL}/users/me/`,
        body,
        config,
      );

      if (response.status === 200) {
        navigation.navigate('Profile');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const connectUserSocial = createAsyncThunk(
  'profile/connectUserSocial',
  async (
    {account_url, social_type}: {account_url: string; social_type: SocialTypes},
    {rejectWithValue},
  ) => {
    try {
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify({
        social_account: account_url,
        type_id: social_type,
      });

      const response = await axios.post<UserSocialsResponse>(
        `${enviroment.API_BASE_URL}/users/me/social-account/`,
        body,
        config,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const connectFacebookProfile = createAsyncThunk(
  'profile/connectFacebookProfile',
  async (
    {access_token, id_token}: connectFacebookProfileParams,
    {rejectWithValue},
  ) => {
    try {
      const session_token = await GetStorageObject('session_token');

      const facebookProfile: FacebookConnectPayload = {
        provider: 'facebook',
        process: 'connect',
        token: {
          client_id: enviroment.FACEBOOK_CLIENT_ID,
          access_token,
          id_token,
        },
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': session_token,
        },
      };
      const body = JSON.stringify(facebookProfile);

      const response = await axios.post<FacebookConnectResponse>(
        `${enviroment.API_BASE_URL}/users/_allauth/app/v1/auth/provider/token`,
        body,
        config,
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const getUserSocials = createAsyncThunk(
  'profile/getUserSocials',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<UserSocialsResponse[]>(
        `${enviroment.API_BASE_URL}/users/me/social-account/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
