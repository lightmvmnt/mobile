import SigninScreen from "@modules/auth/screens/Signin";
import IntroductionScreen from "@modules/introduction/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export type AuthStackNavigatorParamList = {
    Loading: undefined;
    Introduction: undefined;
    Signin: undefined;
}


const AuthStack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator 
            initialRouteName="Introduction"
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="Introduction" component={IntroductionScreen} />
            <AuthStack.Screen name="Signin" component={SigninScreen} />
        </AuthStack.Navigator>
    )
}

export default AuthStackNavigator;
