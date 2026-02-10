import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {environment} from '../../constants/environment';
import {NavigationProps} from '../../services/navigation/Base.navigation';
import {
  Account,
  connectFacebookProfileParams,
  FacebookConnectPayload,
  FacebookConnectResponse,
  GetconnectedProvidersResponse,
  removeConnectedProviderPayload,
  UpdateAccountPayload,
  UserSocialsResponse,
} from './profile.types';

export const GetAccountData = createAsyncThunk(
  'profile/GetAccountData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<Account>(
        `${environment.API_BASE_URL}/users/me/`,
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
      const body = JSON.stringify(updated_account);

      const response = await axios.patch<Account>(
        `${environment.API_BASE_URL}/users/me/`,
        body,
      );

      if (response.status === 200) {
        navigation.navigate('Profile');
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

export const connectUserSocial = createAsyncThunk(
  'profile/connectUserSocial',
  async (
    {account_url, social_type}: {account_url: string; social_type: number},
    {rejectWithValue},
  ) => {
    try {
      const body = JSON.stringify({
        social_account: account_url,
        type_id: social_type,
      });

      const response = await axios.post<UserSocialsResponse>(
        `${environment.API_BASE_URL}/users/me/social-account/`,
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

export const getUserSocials = createAsyncThunk(
  'profile/getUserSocials',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<UserSocialsResponse[]>(
        `${environment.API_BASE_URL}/users/me/social-account/`,
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

export const removeUserSocial = createAsyncThunk(
  'profile/removeUserSocial',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${environment.API_BASE_URL}/users/me/social-account/${id}`,
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

export const connectFacebookProfile = createAsyncThunk(
  'profile/connectFacebookProfile',
  async (
    {id_token, access_token}: connectFacebookProfileParams,
    {rejectWithValue},
  ) => {
    try {
      const facebookProfile: FacebookConnectPayload = {
        provider: 'facebook',
        process: 'connect',
        token: {
          client_id: environment.FACEBOOK_CLIENT_ID,
          id_token,
          access_token,
        },
      };

      const body = JSON.stringify(facebookProfile);

      const response = await axios.post<FacebookConnectResponse>(
        `${environment.API_BASE_URL}/auth/provider/token`,
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

export const getConnectedProviders = createAsyncThunk(
  'profile/getConnectedProviders',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetconnectedProvidersResponse>(
        `${environment.API_BASE_URL}/auth/providers`,
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

export const removeConnectedProvider = createAsyncThunk(
  'profile/removeConnectedProvider',
  async (
    {
      provider,
      navigation,
    }: {provider: removeConnectedProviderPayload; navigation: NavigationProps},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.delete<GetconnectedProvidersResponse>(
        `${environment.API_BASE_URL}/auth/providers`,
        {data: provider},
      );

      if (response.data.status === 200) {
        navigation.navigate('Profile');
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
