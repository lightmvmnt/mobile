import FbIcon from '@assets/icons/fbIcon.svg';
import LinkdinIcon from '@assets/icons/linkdinIcon.svg';
import TiktokIcon from '@assets/icons/tiktokIcon.svg';
import YoutubeIcon from '@assets/icons/ytIcon.svg';
import {Account, SocialAccount} from '@store/profile/profile.types';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {styles} from './SocialsEditForm.styles';

const SocialsButton = ({
  onButtonPress,
  socialAccount,
  socialAccountType,
  account,
  removalLoading,
}: {
  onButtonPress: () => void;
  removalLoading: boolean;
  socialAccount?: SocialAccount;
  socialAccountType: 'FB' | 'YT' | 'TT' | 'LDIN';
  account: Account | null;
}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    switch (socialAccountType) {
      case 'FB':
        setName('ფეისბუქი');
        break;
      case 'TT':
        setName('ტიკ ტოკი');
        break;
      case 'YT':
        setName('იუთუბი');
        break;
      case 'LDIN':
        setName('ლინკდინი');
        break;
      default:
        break;
    }
  }, [socialAccountType]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.input}
      disabled={
        removalLoading ||
        (socialAccount &&
          account?.leader_details &&
          account?.leader_details.is_approved)
      }
      onPress={onButtonPress}>
      {socialAccount ? (
        <View style={styles.connectedButton}>
          {socialAccountType === 'FB' && <FbIcon width={25} height={25} />}
          {socialAccountType === 'TT' && <TiktokIcon width={25} height={25} />}
          {socialAccountType === 'YT' && <YoutubeIcon width={25} height={25} />}
          {socialAccountType === 'LDIN' && (
            <LinkdinIcon width={25} height={25} />
          )}
          <Text style={styles.connectedButtonText}>
            {account?.first_name} {account?.last_name}
          </Text>
        </View>
      ) : (
        <Text>{name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SocialsButton;
