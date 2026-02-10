import {SafeAreaBackgroundWithHeader} from '@components';
import {COLORS} from '@constants';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import RepresentativeDetailsButtons from '../../components/RepresentativeDetailsButtons';
import RepresentativeDetailsCard from '../../components/RepresentativeDetailsCard';
import {useRepresentativeDetails} from './RepresentativeDetails.hook';
import {styles} from './RepresentativeDetails.styles';

const RepresentativeDetailsScreen = () => {
  const {representative_details, get_representative_details_loading} =
    useRepresentativeDetails();

  return (
    <SafeAreaBackgroundWithHeader>
      {!get_representative_details_loading ? (
        <View style={styles.container}>
          <RepresentativeDetailsCard representative={representative_details} />
          <RepresentativeDetailsButtons
            representative={representative_details}
          />
        </View>
      ) : (
        <ActivityIndicator animating={true} size={50} color={COLORS.MAIN} />
      )}
    </SafeAreaBackgroundWithHeader>
  );
};

export default RepresentativeDetailsScreen;
