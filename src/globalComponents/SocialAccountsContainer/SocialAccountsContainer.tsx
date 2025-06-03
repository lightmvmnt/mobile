import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './SocialAccountsContainer.styles';
import FbIcon from '../../assets/icons/fbIcon.svg';
import TiktokIcon from '../../assets/icons/tiktokIcon.svg';
import YtIcon from '../../assets/icons/ytIcon.svg';
import LinkdinIcon from '../../assets/icons/linkdinIcon.svg';

const SocialAccountsContainer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>სოციალური ქსელები: </Text>
      <View style={styles.socialAccountsButtonsContainer}>
        <TouchableOpacity style={styles.socialAccountsButton}>
          <FbIcon width={28} height={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialAccountsButton}>
          <TiktokIcon width={28} height={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialAccountsButton}>
          <YtIcon width={28} height={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialAccountsButton}>
          <LinkdinIcon width={28} height={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialAccountsContainer;
