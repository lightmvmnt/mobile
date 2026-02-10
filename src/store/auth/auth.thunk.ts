import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  CreateUser,
  GetUserTotalPointsResponse,
  SigninResponse,
} from './auth.types';
import {NavigationProps} from '../../services/navigation/Base.navigation';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetStorageObject,
  RemoveStorageValue,
  SetStorageObjectValue,
} from '../../utils/asyncStore.util';
import axios from 'axios';
import {environment} from '../../constants/environment';
import {
  sendAndroidDeviceIdForTasks,
  sendIosDeviceIdForTasks,
} from '../tasks/tasks.thunk';
import {
  getApnsToken,
  getFcmToken,
} from '../../services/notifications/notificationHandler';
import {Platform} from 'react-native';
import appleAuth from '@invertase/react-native-apple-authentication';
import appsFlyer from 'react-native-appsflyer';

GoogleSignin.configure({
  webClientId: environment.CLIENT_ID,
  iosClientId: environment.IOS_CLIENT_ID,
});

export const GoogleSignIn = createAsyncThunk(
  'auth/GoogleSignIn',
  async (
    {navigation, device_id}: {navigation: NavigationProps; device_id: string},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const hasPreviousSignIn = await GoogleSignin.hasPreviousSignIn();

      const googleUserInfo = hasPreviousSignIn
        ? await GoogleSignin.signInSilently()
        : await GoogleSignin.signIn();

      await GoogleSignin.hasPlayServices();

      if (googleUserInfo.data) {
        const {idToken} = googleUserInfo.data;

        const newGoogleUser: CreateUser = {
          provider: 'google',
          process: 'login',
          token: {
            client_id: environment.CLIENT_ID,
            id_token: idToken ? idToken : '',
          },
        };

        dispatch(
          authentication({
            navigation,
            user: newGoogleUser,
            device_id,
          }),
        );
      }

      return;
    } catch (error) {
      await GoogleSignin.signOut();

      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const IosSignIn = createAsyncThunk(
  'auth/IosSignIn',
  async (
    {navigation, device_id}: {navigation: NavigationProps; device_id: string},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {identityToken} = appleAuthRequestResponse;

        const newIosUser: CreateUser = {
          provider: 'apple',
          process: 'login',
          token: {
            client_id: environment.APPLE_SIGNIN_CLIENT_ID,
            id_token: identityToken ? identityToken : '',
          },
        };

        dispatch(
          authentication({
            navigation,
            user: newIosUser,
            device_id,
          }),
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const authentication = createAsyncThunk(
  'auth/authentication',
  async (
    {
      navigation,
      user,
      device_id,
    }: {
      navigation: NavigationProps;
      user: CreateUser;
      device_id: string;
    },
    {rejectWithValue, dispatch},
  ) => {
    try {
      const token =
        Platform.OS === 'android' ? await getFcmToken() : await getApnsToken();

      const body = JSON.stringify(user);

      const response = await axios.post<SigninResponse>(
        `${environment.API_BASE_URL}/users/_allauth/app/v1/auth/provider/token`,
        body,
      );

      if (response.status === 200) {
        await SetStorageObjectValue(
          'access_token',
          response.data.meta.access_token,
        );
        await SetStorageObjectValue(
          'session_token',
          response.data.meta.session_token,
        );
        await SetStorageObjectValue('user', response.data.data.user);

        const NotificationSubscription = {
          session_token: response.data.meta.session_token,
          device_id,
          access_token: response.data.meta.access_token,
          token,
        };

        if (Platform.OS === 'android') {
          dispatch(sendAndroidDeviceIdForTasks(NotificationSubscription));
        } else {
          dispatch(sendIosDeviceIdForTasks(NotificationSubscription));
        }

        appsFlyer.setCustomerUserId(String(response.data.data.user.id));

        navigation.navigate('Loading');
      }

      return response.data;
    } catch (error) {
      await GoogleSignin.signOut();

      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const CheckSessionValidation = createAsyncThunk(
  'auth/CheckSessionValidation',
  async (
    {
      session_token,
      navigation,
    }: {session_token: string; navigation: NavigationProps},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.get<SigninResponse>(
        `${environment.API_BASE_URL}/users/_allauth/app/v1/auth/session`,
      );

      if (response.status === 200) {
        SetStorageObjectValue('user', response.data.data.user);
      }

      return response.data;
    } catch (error) {
      await GoogleSignin.signOut();
      await RemoveStorageValue('session_token');
      await RemoveStorageValue('access_token');
      await RemoveStorageValue('user');

      navigation.navigate('Signin');

      navigation.navigate('Signin');

      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const Logout = createAsyncThunk(
  'auth/Logout',
  async (navigation: NavigationProps, {rejectWithValue}) => {
    try {
      await GoogleSignin.signOut();
      await RemoveStorageValue('session_token');
      await RemoveStorageValue('access_token');
      await RemoveStorageValue('user');

      navigation.navigate('Signin');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const AccountDeletion = createAsyncThunk(
  'auth/AccountDeletion',
  async (navigation: NavigationProps, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.delete(
        `${environment.API_BASE_URL}/users/me/`,
      );

      if (response.status === 204) {
        dispatch(Logout(navigation));
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

export const getUserTotalPoints = createAsyncThunk(
  'auth/getUserTotalPoints',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetUserTotalPointsResponse>(
        `${environment.API_BASE_URL}/users/me/points/`,
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
