/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {CompositeNavigationProp, useIsFocused} from '@react-navigation/native';
import {changeDeviceId} from '@store/slices/auth/auth.slice';
import {
  CheckSessionValidation,
  GetUserData,
  getUserTotalPoints,
} from '@store/thunks/auth/auth.thunk';
import {getUniqueId} from 'react-native-device-info';
import {
  getCompletedTaskCount,
  getTasks,
  getTasksPoints,
} from '@store/thunks/tasks/tasks.thunk';
import {
  getAllPolls,
  getPollsPoints,
  getUserPollsVotes,
} from '@store/thunks/polls/polls.thunk';
import {User} from '@store/thunks/auth/auth.types';
import {requestNotificationsPermission} from '@services/notifications/notificationPermissions';
import {notificationHandler} from '@services/notifications/notificationHandler';
import AuthStackNavigator, {
  AuthStackNavigatorParamList,
} from './AuthStack/AuthStackNavigator';
import LoadingScreen from 'modules/loading/screens/Loading.screen';
import {useAppDispatch, useAppSelector} from 'store/store';
import {GetStorageObject} from 'utils/asyncStore.util';
import RootStackNavigator, {
  RootStackParamList,
} from './RootStack/RootStackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Union RootStack with AuthStack
export type AppNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  NativeStackNavigationProp<AuthStackNavigatorParamList>
>;

const NavigationWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stackType, setStackType] = useState<'authStack' | 'bottomStack'>(
    'authStack',
  );
  const [isFirstLaunched, setIsFirstLaunched] = useState(false);

  const {isAuth, user, account, sessionToken, accessToken, userTotalPoints} =
    useAppSelector(state => state.auth);
  const {tasks, tasksPoints, completedTasksCount} = useAppSelector(
    state => state.tasks,
  );
  const {polls, pollsPoints} = useAppSelector(state => state.polls);

  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    getIsFirstLaunch();
  }, []);

  const getIsFirstLaunch = async () => {
    const is_first_launched = await GetStorageObject('IS_FIRST_LAUNCH');
    if (!is_first_launched) {
      setIsLoading(false);
      setStackType('authStack');
      //   navigation.navigate('HomeHomeScreen');

      //   navigation.navigate('Introduction');
    } else {
      setIsFirstLaunched(is_first_launched);
    }
  };

  const getSessionToken = async (token?: string) => {
    const session_token = token
      ? token
      : await GetStorageObject('session_token');

    if (session_token) {
      const response = await dispatch(CheckSessionValidation({session_token}));
      if (response.payload.status === 200) {
        setIsLoading(false);
        setStackType('bottomStack');
      } else {
        setIsLoading(false);
        setStackType('authStack');
      }
    } else {
      if (isFirstLaunched) {
        setIsLoading(false);
        setStackType('authStack');
      }
    }
  };

  const getImportantInfo = async () => {
    const session_token = await GetStorageObject('session_token');
    const access_token = await GetStorageObject('access_token');
    const session_user: User = await GetStorageObject('user');

    if (session_user && session_token && access_token) {
      dispatch(getTasks());
      dispatch(getTasksPoints());
      dispatch(getCompletedTaskCount());
      dispatch(GetUserData());
      dispatch(getUserTotalPoints());
      dispatch(getAllPolls());
      dispatch(getPollsPoints());
      dispatch(getUserPollsVotes());
    } else {
      if (isFirstLaunched) {
        setIsLoading(false);
        setStackType('authStack');
      }
    }
  };

  useEffect(() => {
    getSessionToken();
    getUniqueId().then(id => {
      dispatch(changeDeviceId(id));
    });
  }, [dispatch, isFirstLaunched]);

  useEffect(() => {
    getImportantInfo();
  }, [dispatch, isFirstLaunched]);

  useEffect(() => {
    requestNotificationsPermission();
    notificationHandler(dispatch);
    if (
      isFocused &&
      isAuth &&
      user &&
      account &&
      tasks &&
      tasksPoints &&
      completedTasksCount >= 0 &&
      userTotalPoints >= 0 &&
      polls &&
      pollsPoints
    ) {
      setIsLoading(false);
      setStackType('bottomStack');
    }
  }, [
    tasks,
    tasksPoints,
    completedTasksCount,
    isAuth,
    user,
    userTotalPoints,
    polls,
    pollsPoints,
    account,
    isFocused,
    dispatch,
  ]);

  useEffect(() => {
    if (sessionToken) {
      getSessionToken(sessionToken);
    } else {
      setStackType('authStack');
    }
  }, [sessionToken, accessToken]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {stackType === 'bottomStack' ? (
        <RootStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </>
  );
};

export default NavigationWrapper;
