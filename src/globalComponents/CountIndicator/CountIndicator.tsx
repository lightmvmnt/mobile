import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../constants';
import {Text, View} from 'react-native';
import {styles} from './CountIndicator.styles';
import UserIcon from '../../assets/icons/userIcon.svg';

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
        <ActivityIndicator size={20} color={COLORS.MAIN} />
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
