import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import {
  Account,
  ConnectedProvider,
} from '../../../../store/slices/profile/profile.types';
import FbIcon from '../../../../assets/icons/fbIcon.svg';

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
