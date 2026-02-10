import {SafeAreaBackgroundWithHeader} from '@components';
import React from 'react';
import {FlatList, View} from 'react-native';

import RepresentativeCard from '../../components/RepresentativeCard';
import RepresentativeSearchbar from '../../components/RepresentativeSearchbar';
import {useRepresentative} from './Representative.hooks';
import {styles} from './Representative.styles';

const RepresentativeScreen = () => {
  const {representatives, get_representatives_loading, onRefresh} =
    useRepresentative();

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.container}>
        <RepresentativeSearchbar />
        <FlatList
          refreshing={get_representatives_loading}
          onRefresh={onRefresh}
          scrollEnabled
          data={representatives}
          renderItem={({item, index}) => (
            <RepresentativeCard
              key={index}
              representative={item}
              loading={get_representatives_loading}
            />
          )}
        />
      </View>
    </SafeAreaBackgroundWithHeader>
  );
};

export default RepresentativeScreen;
