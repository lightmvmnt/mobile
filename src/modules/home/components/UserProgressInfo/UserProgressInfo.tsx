import React from 'react';
import {InfoContainer} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import CompletedMissions from '../../../../assets/icons/completedMissions.svg';
import Scores from '../../../../assets/icons/scores.svg';
import {styles} from './UserProgressInfo.styles';
import {View} from 'react-native';

const UserProgressInfo = () => {
  return (
    <View style={styles.progressInfoContainer}>
      <InfoContainer
        title="შესრულებული მისიები"
        count={20}
        counterBgColor={COLORS.NEW_MAIN}
        counterColor={COLORS.LIGHT}
        Icon={CompletedMissions}
      />
      <InfoContainer
        title="დაგროვებული ქულა"
        count={200}
        counterBgColor={COLORS.SECONDARY}
        counterColor={COLORS.DARK}
        Icon={Scores}
      />
      <View style={styles.breakLine} />
    </View>
  );
};

export default UserProgressInfo;
