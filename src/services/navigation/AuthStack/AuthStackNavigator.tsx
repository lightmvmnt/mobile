import SigninScreen from '@modules/auth/screens/Signin';
import IntroductionScreen from '@modules/introduction/screens';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type AuthStackNavigatorParamList = {
  IntroductionScreen: undefined;
  SigninScreen: undefined;
};

export type IntroductionScreenParams = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'IntroductionScreen'
>;
export type SigninScreenParams = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  'SigninScreen'
>;

const AuthStack = createNativeStackNavigator<AuthStackNavigatorParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="IntroductionScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name="IntroductionScreen"
        component={IntroductionScreen}
      />
      <AuthStack.Screen name="SigninScreen" component={SigninScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
