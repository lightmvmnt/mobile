import React from 'react';
import {View} from 'react-native';
import {styles} from './LogoWithTitle.styles';
import Logo from '../../assets/images/DzalaLogo.svg';
import TitleOne from '../../assets/images/slide1Title.svg';
import TitleTwo from '../../assets/images/slide2Title.svg';
import TitleThree from '../../assets/images/slide3Title.svg';

function LogoWithTitle({slideIndex}: {slideIndex: number}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={180} height={90} />
      </View>
      {slideIndex === 0 && <TitleOne width={180} height={90} />}
      {slideIndex === 1 && <TitleTwo width={270} height={90} />}
      {slideIndex === 2 && <TitleThree width={280} height={90} />}
    </View>
  );
}

export default LogoWithTitle;
