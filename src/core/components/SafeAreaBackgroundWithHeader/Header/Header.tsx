import React from 'react';
import {View} from 'react-native';
import {styles} from './Header.styles';
import Logo from '../../../../assets/images/DzalaLogo.svg';
import BackImg from '../../../../assets/images/back_img.svg';
import {LAYOUT} from '../../../../constants';

function Header({height}: {height: number}) {
  return (
    <View style={[styles.header, {flex: height}]}>
      <Logo width={100} height={50} />
      <BackImg style={styles.backImg} width={LAYOUT.WIDTH - 30} />
      {/* <SimpleButton
        variant="text"
        textColor="white"
        onPress={onButtonPress}
        text="პროფილი"
        fontSize={FontSizeGenerator(Platform.OS === 'android' ? 15 : 13)}
        width={110}
        height={48}
      /> */}
    </View>
  );
}

export default Header;
