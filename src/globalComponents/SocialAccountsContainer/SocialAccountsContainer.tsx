import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {styles} from './SocialAccountsContainer.styles';
import FbIcon from '../../assets/icons/fbIcon.svg';
import TiktokIcon from '../../assets/icons/tiktokIcon.svg';
import YtIcon from '../../assets/icons/ytIcon.svg';
import LinkdinIcon from '../../assets/icons/linkdinIcon.svg';
import {Props} from './SocialAccountsContainer.types';

const SocialAccountsContainer = ({socialAccounts}: Props) => {
  const onSocialButtonPress = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>სოციალური ქსელები: </Text>
      <View style={styles.socialAccountsButtonsContainer}>
        {socialAccounts &&
          socialAccounts.map((socialAccount, i) => (
            <TouchableOpacity
              key={+i}
              style={styles.socialAccountsButton}
              onPress={() => onSocialButtonPress(socialAccount.link)}>
              {socialAccount.type === 'FB' && <FbIcon width={28} height={28} />}
              {socialAccount.type === 'YT' && <YtIcon width={28} height={28} />}
              {socialAccount.type === 'TT' && (
                <TiktokIcon width={28} height={28} />
              )}
              {socialAccount.type === 'LDIN' && (
                <LinkdinIcon width={28} height={28} />
              )}
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default SocialAccountsContainer;
