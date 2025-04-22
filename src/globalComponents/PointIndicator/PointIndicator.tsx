import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../constants';
import {styles} from './PointIndicator.styles';
import PointStarIcon from '../../assets/icons/pointStar.svg';

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
