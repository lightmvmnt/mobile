import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './SafeAreaBackground.styles';
import {BackHandler, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../services/navigation/Base.navigation';
import {useAppSelector} from '../../store/store';
import BackImg from '../../assets/icons/back_img.svg';
import {LAYOUT} from '../../constants';

function SafeAreaBackground({children}: {children: React.ReactNode}) {
  const {user} = useAppSelector(state => state.auth);

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
