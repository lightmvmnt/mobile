import {View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './RepresentativeSearchbar.styles';
import {COLORS} from '../../../../constants';
import useDebounce from '../../../../hooks/debounce';

const RepresentativeSearchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce({value: searchQuery});

  useEffect(() => {
    console.log(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

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
