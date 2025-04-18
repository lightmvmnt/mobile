import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import Header from './Header';
import {styles} from './SafeAreaBackgroundWithHeader.styles';
import { useRoute} from '@react-navigation/native';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

function SafeAreaBackgroundWithHeader({children}: {children: React.ReactNode}) {

  const route = useRoute();
  const navigation = useAppNavigation();

  useEffect(() => {
    const backAction = () => {
      if (route.name === 'HomeScreen') {
        BackHandler.exitApp();
      } else {
        navigation.goBack();
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [route, navigation]);

  return (
    <View style={styles.container}>
      <Header height={0.15} />
      <View style={[styles.safeArea, {flex: 0.85}]}>{children}</View>
    </View>
  );
}

export default SafeAreaBackgroundWithHeader;
