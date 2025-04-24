import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";


import HomeScreen from "@modules/home/screens";
import PollsScreen from "@modules/polls/screens/Polls";
import TasksScreen from "@modules/tasks/screens/Tasks";
import TabBarComponent from "./TabBarComponent";
import ProfileScreen from "modules/profile/screens/Profile";
import UpdateScreen from 'modules/update/screens/Update.screen';
import ProfileEditScreen from 'modules/profile/screens/ProfileEdit';
import ProfileSettingsScreen from 'modules/profile/screens/ProfileSettings';


export type BottomTabStackNavigatorParamList = {
    HomeScreen: undefined;
    TasksScreen: undefined;
    PollsScreen: undefined;
    ProfileScreen: undefined;
    UpdateScreen: undefined;
    ProfileEditScreen: undefined;
    ProfileSettingsScreen: undefined;
}

export type HomeScreenParams = NativeStackScreenProps<BottomTabStackNavigatorParamList, 'HomeScreen'>;
export type TasksScreenParams = NativeStackScreenProps<BottomTabStackNavigatorParamList, 'TasksScreen'>;
export type PollsScreenParams = NativeStackScreenProps<BottomTabStackNavigatorParamList, 'PollsScreen'>;
export type ProfileScreenParams = NativeStackScreenProps<BottomTabStackNavigatorParamList, 'ProfileScreen'>;
export type ProfileEditScreenParams = NativeStackScreenProps<BottomTabStackNavigatorParamList, 'ProfileEditScreen'>;
export type ProfileSettingsScreenParams = NativeStackScreenProps<BottomTabStackNavigatorParamList, 'ProfileSettingsScreen'>;

export type BottomTabStackNavigatorProps = NativeStackNavigationProp<BottomTabStackNavigatorParamList>;


const BottomTabStack = createBottomTabNavigator<BottomTabStackNavigatorParamList>();


const  BottomTabStackNavigator = () => {
    return (
        <BottomTabStack.Navigator
            initialRouteName={"HomeScreen"}
            tabBar={props => <TabBarComponent {...props} />}
            backBehavior={"history"}
            screenOptions={{headerShown: false,}}
        >
            <BottomTabStack.Screen name="HomeScreen" component={HomeScreen} />
            <BottomTabStack.Screen name="TasksScreen" component={TasksScreen} />
            <BottomTabStack.Screen name="PollsScreen" component={PollsScreen} />
            <BottomTabStack.Screen name="ProfileScreen" component={ProfileScreen} />
            <BottomTabStack.Screen name="UpdateScreen" component={UpdateScreen} />
            <BottomTabStack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
            <BottomTabStack.Screen name="ProfileSettingsScreen" component={ProfileSettingsScreen} />
        </BottomTabStack.Navigator>
    )
}


export default BottomTabStackNavigator;