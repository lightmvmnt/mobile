import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {styles} from './SocialAccountsContainer.styles';
import FbIcon from '../../assets/icons/fbIcon.svg';
import TiktokIcon from '../../assets/icons/tiktokIcon.svg';
import YtIcon from '../../assets/icons/ytIcon.svg';
import LinkdinIcon from '../../assets/icons/linkdinIcon.svg';
import {Props, SocialAccounts} from './SocialAccountsContainer.types';
import {SvgProps} from 'react-native-svg';

const SOCIAL_ICONS: Record<SocialAccounts['type'], React.FC<SvgProps>> = {
  FB: FbIcon,
  YT: YtIcon,
  TT: TiktokIcon,
  LDIN: LinkdinIcon,
};

const SocialAccountsContainer = ({socialAccounts}: Props) => {
  const onSocialButtonPress = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>სოციალური ქსელები: </Text>
      <View style={styles.socialAccountsButtonsContainer}>
        {socialAccounts &&
          socialAccounts.map((socialAccount, i) => {
            const Icon = SOCIAL_ICONS[socialAccount.type];
            return (
              <TouchableOpacity
                key={+i}
                style={styles.socialAccountsButton}
                onPress={() => onSocialButtonPress(socialAccount.link)}>
                {Icon && <Icon width={28} height={28} />}
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

export default SocialAccountsContainer;
