import {useNavigation} from '@react-navigation/native';
import {selectUser} from '@store/auth/auth.selectors';
import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import BackImg from '../../assets/icons/back_img.svg';
import {LAYOUT} from '../../constants';
import {NavigationProps} from '../../services/navigation/Base.navigation';
import {useAppSelector} from '../../store/store';
import {styles} from './SafeAreaBackground.styles';

function SafeAreaBackground({children}: {children: React.ReactNode}) {
  const user = useAppSelector(selectUser);

  const navigation = useNavigation<NavigationProps>();

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
