import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import GlobalStackNavigator, {  GlobalStackParamList } from '../GlobalStack/GlobalStackNavigator';
import BottomTabStackNavigator, { BottomTabStackNavigatorParamList, BottomTabStackNavigatorProps } from '../BottomTabStack/BottomTabStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';


export type RootStackParamList = {
  BottomTabsStack: NavigatorScreenParams<BottomTabStackNavigatorParamList>;
  GlobalStack: NavigatorScreenParams<GlobalStackParamList>;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParamList>;


const Stack = createNativeStackNavigator<RootStackParamList>();


const RootStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'BottomTabsStack'} screenOptions={{headerShown: false}}>
            <Stack.Screen name="BottomTabsStack" component={BottomTabStackNavigator} />
            <Stack.Screen name="GlobalStack" component={GlobalStackNavigator} />
        </Stack.Navigator>
    );
}

export default RootStackNavigator;
