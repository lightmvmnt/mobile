import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './Loading.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../services/navigation/Base.navigation';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {GetStorageObject} from '../../../utils/asyncStore.util';
import {
  CheckSessionValidation,
  getUserTotalPoints,
} from '../../../store/thunks/auth/auth.thunk';
import {User} from '../../../store/thunks/auth/auth.types';
import {
  getCompletedTaskCount,
  getTasks,
  getTasksPoints,
} from '../../../store/thunks/tasks/tasks.thunk';
import {requestNotificationsPermission} from '../../../services/notifications/notificationPermissions';
import {notificationHandler} from '../../../services/notifications/notificationHandler';
import {getUniqueId} from 'react-native-device-info';
import {changeDeviceId} from '../../../store/slices/auth/auth.slice';
import {
  getAllPolls,
  getPollsPoints,
  getUserPollsVotes,
} from '../../../store/thunks/polls/polls.thunk';
import Logo from '../../../assets/icons/DzalaLogo.svg';
import BackImg from '../../../assets/icons/back_img.svg';
import {LAYOUT} from '../../../constants';
import {
  GetAccountData,
  getUserSocials,
} from '../../../store/thunks/profile/profile.thunk';

function LoadingScreen() {
  const [isFirstLaunched, setIsFirstLaunched] = useState(false);

  const {isAuth, user, userTotalPoints} = useAppSelector(state => state.auth);
  const {account} = useAppSelector(state => state.profile);
  const {tasks, completedTasksCount, tasksPoints} = useAppSelector(
    state => state.tasks,
  );
  const {polls, pollsPoints} = useAppSelector(state => state.polls);

  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getIsFirstLaunch = async () => {
      const is_first_launched = await GetStorageObject('IS_FIRST_LAUNCH');

      if (!is_first_launched) {
        navigation.navigate('Introduction');
      } else {
        setIsFirstLaunched(is_first_launched);
      }
    };

    getIsFirstLaunch();
  }, [navigation]);

  useEffect(() => {
    const getSessionToken = async () => {
      const session_token = await GetStorageObject('session_token');

      if (session_token) {
        dispatch(CheckSessionValidation({session_token, navigation}));
      } else {
        if (isFirstLaunched) {
          navigation.navigate('Signin');
        }
      }
    };

    getSessionToken();

    getUniqueId().then(id => {
      dispatch(changeDeviceId(id));
    });
  }, [dispatch, navigation, isFirstLaunched]);

  useEffect(() => {
    const getImportantInfo = async () => {
      const session_token = await GetStorageObject('session_token');
      const access_token = await GetStorageObject('access_token');
      const session_user: User = await GetStorageObject('user');

      if (session_user && session_token && access_token) {
        dispatch(getTasks());
        dispatch(getTasksPoints());
        dispatch(getCompletedTaskCount());
        dispatch(GetAccountData());
        dispatch(getUserSocials());
        dispatch(getUserTotalPoints());
        dispatch(getAllPolls());
        dispatch(getPollsPoints());
        dispatch(getUserPollsVotes());
      } else {
        if (isFirstLaunched) {
          navigation.navigate('Signin');
        }
      }
    };

    getImportantInfo();
  }, [dispatch, navigation, isFirstLaunched]);

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
      navigation.navigate('Home');
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
    navigation,
    isFocused,
    dispatch,
  ]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Logo width={180} height={90} style={styles.logo} />
        <BackImg style={styles.backImg} width={LAYOUT.WIDTH} />
      </SafeAreaView>
    </View>
  );
}

export default LoadingScreen;
