import React from 'react';
import {Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import PointStarIcon from '../../assets/icons/pointStar.svg';
import {COLORS} from '../../constants';
import {styles} from './PointIndicator.styles';

const PointIndicator = ({
  loading,
  point,
}: {
  loading: boolean;
  point: number;
}) => {
  return (
    <View style={styles.pointIndicator}>
      {loading ? (
        <ActivityIndicator size={20} color={COLORS.DARK} />
      ) : (
        <>
          <PointStarIcon width={15} height={15} />
          <Text style={styles.pointIndicatorText}>+{point}</Text>
        </>
      )}
    </View>
  );
};

export default PointIndicator;
