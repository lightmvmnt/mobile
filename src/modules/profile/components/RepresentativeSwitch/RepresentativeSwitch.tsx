import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './RepresentativeSwitch.styles';
import {Switch} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import {useRepresentativeSwitch} from './RepresentativeSwitch.hooks';

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
