import React from 'react';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import RepresentativeDetailsCard from '../../components/RepresentativeDetailsCard';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './RepresentativeDetails.styles';
import {useRepresentativeDetails} from './RepresentativeDetails.hook';
import {COLORS} from '../../../../constants';

const RepresentativeDetailsScreen = () => {
  const {representative_details, get_representative_details_loading} =
    useRepresentativeDetails();

  return (
    <SafeAreaBackgroundWithHeader>
      {!get_representative_details_loading ? (
        <View style={styles.container}>
          <RepresentativeDetailsCard representative={representative_details} />
        </View>
      ) : (
        <ActivityIndicator animating={true} size={50} color={COLORS.MAIN} />
      )}
    </SafeAreaBackgroundWithHeader>
  );
};

export default RepresentativeDetailsScreen;
