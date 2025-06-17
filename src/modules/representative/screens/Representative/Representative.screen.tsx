import {FlatList, View} from 'react-native';
import React from 'react';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import RepresentativeCard from '../../components/RepresentativeCard';
import {styles} from './Representative.styles';
import RepresentativeSearchbar from '../../components/RepresentativeSearchbar';
import {useRepresentative} from './Representative.hooks';

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
