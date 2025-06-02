import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Header.styles';
import Logo from '../../../assets/icons/DzalaLogo.svg';
import BackImg from '../../../assets/icons/back_img.svg';
import {LAYOUT} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../services/navigation/Base.navigation';

function Header({height}: {height: number}) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={[styles.header, {flex: height}]}>
      <Logo width={100} height={50} />
      <BackImg style={styles.backImg} width={LAYOUT.WIDTH - 30} />
      <TouchableOpacity
        style={styles.profileButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.profileButtonText}>პროფილი</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Header;
