import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/store';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { GetStorageObject } from '@utils/asyncStore.util';
import { changeDeviceId } from '@store/slices/auth/auth.slice';
import { CheckSessionValidation, GetUserData } from '@store/thunks/auth/auth.thunk';
import { getUniqueId } from 'react-native-device-info';
import { getTasks } from '@store/thunks/tasks/tasks.thunk';
import { getAllPolls, getUserPollsVotes } from '@store/thunks/polls/polls.thunk';
import { User } from '@store/thunks/auth/auth.types';
import { requestNotificationsPermission } from '@services/notifications/notificationPermissions';
import { notificationHandler } from '@services/notifications/notificationHandler';
import LoadingScreen from '@modules/loading/screens';
import BottomTabStackNavigator from './BottomTabStack/BottomTabStackNavigator';
import AuthStackNavigator from './AuthStack/AuthStackNavigator';

const NavigationWrapper = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [stackType, setStackType] = useState<'authStack' | 'bottomStack'>('authStack');
    const [isFirstLaunched, setIsFirstLaunched] = useState(false);

    const {isAuth, user, account, sessionToken, accessToken} = useAppSelector(state => state.auth);
    const {tasks} = useAppSelector(state => state.tasks);
    const {polls} = useAppSelector(state => state.polls);
    
    // const navigation = useNavigation<NavigationProp<any>>();
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
        //   navigation.navigate('Home');

        //   navigation.navigate('Introduction');
        } else {
          setIsFirstLaunched(is_first_launched);
        }
    };
    
    const getSessionToken = async (sessionToken?: string) => {
        const session_token =  await GetStorageObject('session_token');
        console.log('session_token', session_token);
        if (session_token) {
          const response = await dispatch(CheckSessionValidation({session_token}));
          if(response.payload.status == 200 ){
            setIsLoading(false);
            setStackType('bottomStack');
        }
        else {
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
          dispatch(GetUserData());
          dispatch(getAllPolls());
          dispatch(getUserPollsVotes());
        } else {
          if (isFirstLaunched) {
            setIsLoading(false);
            setStackType('authStack');

            // navigation.navigate('Signin');
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
        if (isFocused && isAuth && user && account && tasks && polls) {
            setIsLoading(false);
            setStackType('bottomStack');
            // navigation.navigate('Home');
        }
    }, [tasks, isAuth, user, polls, account, isFocused, dispatch]);


    useEffect(() => {
      console.log('oxoxoxoxoxoxoxoxxoox', sessionToken, accessToken);
        if(sessionToken){
            getSessionToken(sessionToken)  
        }
        else {
          setStackType('authStack');
        }
    }, [sessionToken, accessToken]);
    
    
    if(isLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (    
        <>
            {stackType === 'bottomStack' ? <BottomTabStackNavigator /> : <AuthStackNavigator />}
        </>
    )
}

export default NavigationWrapper;

const styles = StyleSheet.create({})