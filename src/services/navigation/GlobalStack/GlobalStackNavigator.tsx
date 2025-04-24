import React from 'react';
import {createNativeStackNavigator,} from '@react-navigation/native-stack';

import TaskDetailScreen from 'modules/tasks/screens/TaskDetail';
import PollDetailsScreen from 'modules/polls/screens/PollDetails';


export type GlobalStackParamList = {
  TaskDetail: undefined;
  PollDetails: undefined;
};

const GlobalStack = createNativeStackNavigator<GlobalStackParamList>();

const GlobalStackNavigator = () => {
    return (
        <GlobalStack.Navigator screenOptions={{headerShown: false}}>
            <GlobalStack.Screen name="TaskDetail" component={TaskDetailScreen} />
            <GlobalStack.Screen name="PollDetails" component={PollDetailsScreen} />
        </GlobalStack.Navigator>
    );
}

export default GlobalStackNavigator;
