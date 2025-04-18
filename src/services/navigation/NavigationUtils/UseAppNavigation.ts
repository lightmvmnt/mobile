import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../RootStack/RootStackNavigator';
import { AuthStackNavigatorParamList } from '../AuthStack/AuthStackNavigator';


/**
 * 📍 useAppNavigation
 *
 * Use this hook when navigating across navigators or into nested navigators.
 * 
 * Example:
 * navigation.navigate("GlobalNavigator", {
 *   screen: "PollDetails",
 *   params: { pollId: "123" }
 * });
 */


export type AppNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  NativeStackNavigationProp<AuthStackNavigatorParamList>
>;

export const useAppNavigation = () => useNavigation<AppNavigationProp>();



