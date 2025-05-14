import React from 'react';
import {View} from 'react-native';
import {styles} from './Loading.styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from '../../../assets/icons/DzalaLogo.svg';
import BackImg from '../../../assets/icons/back_img.svg';
import {LAYOUT} from '../../../constants';

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Logo width={180} height={90} style={styles.logo} />
        <BackImg style={styles.backImg} width={LAYOUT.WIDTH} />
      </SafeAreaView>
    </View>
  );
}

export default LoadingScreen;
