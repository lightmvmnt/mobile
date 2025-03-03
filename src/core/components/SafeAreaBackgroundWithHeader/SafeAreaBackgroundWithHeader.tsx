import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import Header from './Header';
import {styles} from './SafeAreaBackgroundWithHeader.styles';
import Navigator from './Navigator';
import {NavItems} from '../../config';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps} from '../../routing/Base.routing';

function SafeAreaBackgroundWithHeader({children}: {children: React.ReactNode}) {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();

  useEffect(() => {
    const backAction = () => {
      if (route.name === 'Home') {
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
      <Navigator items={NavItems} />
    </View>
  );
}

export default SafeAreaBackgroundWithHeader;
