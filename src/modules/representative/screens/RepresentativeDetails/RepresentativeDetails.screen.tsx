import React from 'react';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import RepresentativeDetailsCard from '../../components/RepresentativeDetailsCard';
import {View} from 'react-native';
import {styles} from './RepresentativeDetails.styles';

const RepresentativeDetailsScreen = () => {
  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.container}>
        <RepresentativeDetailsCard />
      </View>
    </SafeAreaBackgroundWithHeader>
  );
};

export default RepresentativeDetailsScreen;
