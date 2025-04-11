import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


import HomeScreen from "@modules/home/screens";
import PollsScreen from "@modules/polls/screens/Polls";
import ProfileScreen from "@modules/profile/screens";
import TasksScreen from "@modules/tasks/screens/Tasks";
import TabBarComponent from "./TabBarComponent";


export type BottomTabStackNavigatorParamList = {
    Home: undefined;
    Tasks: undefined;
    Polls: undefined;
    Profile: undefined;
}

export type BottomTabStackNavigatorProps = NativeStackNavigationProp<BottomTabStackNavigatorParamList>;

const BottomTabStack = createBottomTabNavigator<BottomTabStackNavigatorParamList>();

const  BottomTabStackNavigator = () => {
    return (
        <BottomTabStack.Navigator
            initialRouteName={"Home"}
            tabBar={props => <TabBarComponent {...props} />}
            backBehavior={"history"}
            screenOptions={{headerShown: false,}}
        >
            <BottomTabStack.Screen name="Home" component={HomeScreen} />
            <BottomTabStack.Screen name="Tasks" component={TasksScreen} />
            <BottomTabStack.Screen name="Polls" component={PollsScreen} />
            <BottomTabStack.Screen name="Profile" component={ProfileScreen} />
        </BottomTabStack.Navigator>
    )
}

export default BottomTabStackNavigator;