import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';

import SigninScreen from '../../modules/auth/screens/Signin';
import HomeScreen from '../../modules/home/screens';
import IntroductionScreen from '../../modules/introduction/screens';
import LoadingScreen from '../../modules/loading/screens';
import PollDetailsScreen from '../../modules/polls/screens/PollDetails';
import PollsScreen from '../../modules/polls/screens/Polls';
import ProfileScreen from '../../modules/profile/screens/Profile';
import ProfileEditScreen from '../../modules/profile/screens/ProfileEdit';
import ProfileSettingsScreen from '../../modules/profile/screens/ProfileSettings';
import RepresentativeScreen from '../../modules/representative/screens/Representative';
import RepresentativeDetailsScreen from '../../modules/representative/screens/RepresentativeDetails';
import TaskDetailScreen from '../../modules/tasks/screens/TaskDetail';
import TasksScreen from '../../modules/tasks/screens/Tasks';
import UpdateScreen from '../../modules/update/screens/Update.screen';
import BaseInterceptor from '../../store/interceptors';

export type RootStackParamList = {
  Loading: undefined;
  Introduction: undefined;
  Update: undefined;
  Signin: undefined;
  Home: undefined;
  Tasks: undefined;
  TaskDetail: undefined;
  Polls: undefined;
  PollDetails: undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  ProfileSettings: undefined;
  Representative: undefined;
  RepresentativeDetails: undefined;
};
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routing() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="Polls" component={PollsScreen} />
        <Stack.Screen name="PollDetails" component={PollDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettingsScreen}
        />
        <Stack.Screen name="Representative" component={RepresentativeScreen} />
        <Stack.Screen
          name="RepresentativeDetails"
          component={RepresentativeDetailsScreen}
        />
      </Stack.Navigator>
      <BaseInterceptor />
    </NavigationContainer>
  );
}

export default Routing;
