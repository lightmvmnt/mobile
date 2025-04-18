import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import { useAppSelector } from '../../store/store';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

import {LAYOUT} from '../../constants';
import {styles} from './SafeAreaBackground.styles';

import BackImg from '../../assets/icons/back_img.svg';


function SafeAreaBackground({children}: {children: React.ReactNode}) {
  const {user} = useAppSelector(state => state.auth);

  const navigation = useAppNavigation();

  useEffect(() => {
    const backAction = () => {
      if (!user) {
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
  }, [navigation, user]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>{children}</View>
      <BackImg style={styles.backImg} width={LAYOUT.WIDTH} />
    </SafeAreaView>
  );
}

export default SafeAreaBackground;
