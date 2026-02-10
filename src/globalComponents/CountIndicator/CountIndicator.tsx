import React from 'react';
import {Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import UserIcon from '../../assets/icons/userIcon.svg';
import {COLORS} from '../../constants';
import {styles} from './CountIndicator.styles';

const CountIndicator = ({
  loading,
  count,
}: {
  loading: boolean;
  count: number;
}) => {
  return (
    <View style={styles.viewerIndicator}>
      {loading ? (
        <ActivityIndicator size={20} color={COLORS.NEW_MAIN} />
      ) : (
        <>
          <UserIcon width={15} height={15} />
          <Text style={styles.viewerIndicatorText}>{count}</Text>
        </>
      )}
    </View>
  );
};

export default CountIndicator;
