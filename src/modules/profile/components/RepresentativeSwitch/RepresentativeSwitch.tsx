import {COLORS} from '@constants';
import React from 'react';
import {Text, View} from 'react-native';
import {Switch} from 'react-native-paper';

import {useRepresentativeSwitch} from './RepresentativeSwitch.hooks';
import {styles} from './RepresentativeSwitch.styles';

const RepresentativeSwitch = () => {
  const {isSwitchOn, isSwitchDisabled, rep_switch_loading, onToggleSwitch} =
    useRepresentativeSwitch();

  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchInfoContainer}>
        <Text style={styles.switchInfoTitle}>მინდა ვიყო წარმომადგენელი</Text>
        <Text style={styles.switchInfo}>
          ამ ფუნქციონალის მონიშვნით თქვენ ეთანხმებით რომ სხვამ აგირჩიოთ
          წარმომადგნელად (საჯარო პროფილი)
        </Text>
      </View>
      <View style={styles.switchWrapper}>
        <Switch
          color={COLORS.NEW_MAIN}
          value={isSwitchOn}
          disabled={isSwitchDisabled || rep_switch_loading}
          onValueChange={onToggleSwitch}
        />
      </View>
    </View>
  );
};

export default RepresentativeSwitch;
