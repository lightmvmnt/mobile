import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Account,
  CreateUser,
  SigninResponse,
  UpdateUserPayload,
} from './auth.types';
import {NavigationProps} from '../../../services/navigation/Base.navigation';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetStorageObject,
  RemoveStorageValue,
  SetStorageObjectValue,
} from '../../../utils/asyncStore.util';
import axios from 'axios';
import {enviroment} from '../../../constants/enviroment';
import {
  sendAndroidDeviceIdForTasks,
  sendIosDeviceIdForTasks,
} from '../tasks/tasks.thunk';
import {
  getApnsToken,
  getFcmToken,
} from '../../../services/notifications/notificationHandler';
import {Platform} from 'react-native';
import appleAuth from '@invertase/react-native-apple-authentication';
import appsFlyer from 'react-native-appsflyer';

GoogleSignin.configure({
  webClientId: enviroment.CLIENT_ID,
  iosClientId: enviroment.IOS_CLIENT_ID,
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
            client_id: enviroment.CLIENT_ID,
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
    } catch (error: any) {
      await GoogleSignin.signOut();

      return rejectWithValue(error);
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
            client_id: enviroment.APPLE_SIGNIN_CLIENT_ID,
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
      return rejectWithValue(error);
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

      const config = {headers: {'Content-Type': 'application/json'}};
      const body = JSON.stringify(user);

      const response = await axios.post<SigninResponse>(
        `${enviroment.API_BASE_URL}/users/_allauth/app/v1/auth/provider/token`,
        body,
        config,
      );

      if (response.status === 200) {
        SetStorageObjectValue('access_token', response.data.meta.access_token);
        SetStorageObjectValue(
          'session_token',
          response.data.meta.session_token,
        );
        SetStorageObjectValue('user', response.data.data.user);

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

      return rejectWithValue(error);
    }
  },
);

export const GetUserData = createAsyncThunk(
  'auth/getUserData',
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
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': session_token,
        },
      };

      const response = await axios.get<SigninResponse>(
        `${enviroment.API_BASE_URL}/users/_allauth/app/v1/auth/session`,
        config,
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

      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  },
);

export const AccountDeletion = createAsyncThunk(
  'auth/AccountDeletion',
  async (navigation: NavigationProps, {rejectWithValue, dispatch}) => {
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

      const response = await axios.delete(
        `${enviroment.API_BASE_URL}/users/me/`,
        config,
      );

      if (response.status === 204) {
        dispatch(Logout(navigation));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (
    {
      updated_user,
      navigation,
    }: {updated_user: UpdateUserPayload; navigation: NavigationProps},
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

      const body = JSON.stringify(updated_user);

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
