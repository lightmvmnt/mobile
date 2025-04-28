import React from 'react';
import {createNativeStackNavigator,} from '@react-navigation/native-stack';

export type GlobalStackParamList = {
};

const GlobalStack = createNativeStackNavigator<GlobalStackParamList>();

const GlobalStackNavigator = () => {
    return (
        <GlobalStack.Navigator screenOptions={{headerShown: false}}>
            
        </GlobalStack.Navigator>
    );
}

export default GlobalStackNavigator;
