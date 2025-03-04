import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import IntroductionScreen from '../../modules/introduction/screens';
import SigninScreen from '../../modules/auth/screens/Signin';
import HomeScreen from '../../modules/home/screens';
import TasksScreen from '../../modules/tasks/screens/Tasks';
import TaskDetailScreen from '../../modules/tasks/screens/TaskDetail';
import PollsScreen from '../../modules/polls/screens/Polls';
import PollDetailsScreen from '../../modules/polls/screens/PollDetails';
import ProfileScreen from '../../modules/profile/screens';
import BaseInterceptor from '../../store/interceptors';
import LoadingScreen from '../../modules/loading/screens';

export type RootStackParamList = {
  Loading: undefined;
  Introduction: undefined;
  Signin: undefined;
  Home: undefined;
  Tasks: undefined;
  TaskDetail: undefined;
  Polls: undefined;
  PollDetails: undefined;
  Profile: undefined;
};
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routing() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="Polls" component={PollsScreen} />
        <Stack.Screen name="PollDetails" component={PollDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
      <BaseInterceptor />
    </NavigationContainer>
  );
}

export default Routing;
