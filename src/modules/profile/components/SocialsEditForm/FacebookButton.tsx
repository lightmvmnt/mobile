import FbIcon from '@assets/icons/fbIcon.svg';
import {Account, ConnectedProvider} from '@store/profile/profile.types';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {styles} from './SocialsEditForm.styles';

const FacebookButton = ({
  account,
  provider,
  onButtonPress,
}: {
  account: Account | null;
  provider: ConnectedProvider | undefined;
  onButtonPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.input}
      onPress={onButtonPress}>
      {provider ? (
        <View style={styles.connectedButton}>
          <FbIcon width={25} height={25} />
          <Text style={styles.connectedButtonText}>
            {account?.first_name} {account?.last_name}
          </Text>
        </View>
      ) : (
        <Text>ფეისბუქი</Text>
      )}
    </TouchableOpacity>
  );
};

export default FacebookButton;
