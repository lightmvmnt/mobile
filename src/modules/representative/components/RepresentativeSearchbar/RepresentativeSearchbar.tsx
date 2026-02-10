import {COLORS} from '@constants';
import useDebounce from '@hooks/debounce';
import {getRepresentatives} from '@store/representatives/representatives.thunk';
import {useAppDispatch} from '@store/store';
import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';

import {styles} from './RepresentativeSearchbar.styles';

const RepresentativeSearchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce({value: searchQuery});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRepresentatives(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ძებნა"
        placeholderTextColor={COLORS.DARK}
        cursorColor={COLORS.DARK}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default RepresentativeSearchbar;
