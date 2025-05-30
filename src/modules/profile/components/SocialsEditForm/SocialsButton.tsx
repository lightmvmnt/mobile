import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import {
  Account,
  SocialAccount,
} from '../../../../store/slices/profile/profile.types';
import FbIcon from '../../../../assets/icons/fbIcon.svg';

const SocialsButton = ({
  name,
  onButtonPress,
  socialAccount,
  account,
}: {
  name: string;
  onButtonPress: () => void;
  socialAccount?: SocialAccount;
  account: Account | null;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.input}
      onPress={onButtonPress}>
      {socialAccount && socialAccount.type_id === 1 ? (
        <View style={styles.connectedButton}>
          <FbIcon width={25} height={25} />
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
