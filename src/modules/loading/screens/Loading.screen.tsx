import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {styles} from './Loading.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/routing/Base.routing';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {GetStorageObject} from '../../../utils/asyncStore.util';
import {
  CheckSessionValidation,
  GetUserData,
} from '../../../store/thunks/auth/auth.thunk';
import {User} from '../../../store/thunks/auth/auth.types';
import {getTasks} from '../../../store/thunks/tasks/tasks.thunk';
import {requestNotificationsPermission} from '../../../utils/notificationPermissions.util';
import {notificationHandler} from '../../../utils/notificationHandler.util';
import {getUniqueId} from 'react-native-device-info';
import {changeDeviceId} from '../../../store/slices/auth/auth.slice';
import {
  getAllPolls,
  getUserPollsVotes,
} from '../../../store/thunks/polls/polls.thunk';
import Logo from '../../../assets/images/DzalaLogo.svg';
import BackImg from '../../../assets/images/back_img.svg';
import {LAYOUT} from '../../../constants';

function LoadingScreen() {
  const [isFirstLaunched, setIsFirstLaunched] = useState(false);

  const {isAuth, user, account} = useAppSelector(state => state.auth);
  const {tasks} = useAppSelector(state => state.tasks);
  const {polls} = useAppSelector(state => state.polls);

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
        dispatch(GetUserData());
        dispatch(getAllPolls());
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
    if (isFocused && isAuth && user && account && tasks && polls) {
      navigation.navigate('Home');
    }
  }, [tasks, isAuth, user, polls, account, navigation, isFocused, dispatch]);

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
