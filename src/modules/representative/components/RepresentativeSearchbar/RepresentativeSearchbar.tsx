import {View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './RepresentativeSearchbar.styles';
import {COLORS} from '../../../../constants';
import useDebounce from '../../../../hooks/debounce';
import {useAppDispatch} from '../../../../store/store';
import {getRepresentatives} from '../../../../store/thunks/representatives/representatives.thunk';

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
