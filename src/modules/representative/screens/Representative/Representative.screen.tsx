import {ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import RepresentativeCard from '../../components/RepresentativeCard';
import {styles} from './Representative.styles';
import RepresentativeSearchbar from '../../components/RepresentativeSearchbar';

const RepresentativeScreen = () => {
  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.container}>
        <RepresentativeSearchbar />
        <ScrollView>
          <RepresentativeCard />
          <RepresentativeCard />
          <RepresentativeCard />
          <RepresentativeCard />
        </ScrollView>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
};

export default RepresentativeScreen;
