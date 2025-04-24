import React from 'react';
import {InfoContainer} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import CompletedMissions from '../../../../assets/icons/completedMissions.svg';
import Scores from '../../../../assets/icons/scores.svg';
import {styles} from './UserProgressInfo.styles';
import {View} from 'react-native';
import {useAppSelector} from '../../../../store/store';

const UserProgressInfo = () => {
  const {completedTasksCount, completedTasksCountLoading} = useAppSelector(
    state => state.tasks,
  );

  const {userTotalPoints, userTotalPointsLoading} = useAppSelector(
    state => state.auth,
  );

  return (
    <View style={styles.progressInfoContainer}>
      <InfoContainer
        title="შესრულებული მისიები"
        count={completedTasksCount}
        counterBgColor={COLORS.NEW_MAIN}
        counterColor={COLORS.LIGHT}
        Icon={CompletedMissions}
        loading={completedTasksCountLoading}
      />
      <InfoContainer
        title="დაგროვებული ქულა"
        count={userTotalPoints}
        counterBgColor={COLORS.SECONDARY}
        counterColor={COLORS.DARK}
        Icon={Scores}
        loading={userTotalPointsLoading}
      />
      <View style={styles.breakLine} />
    </View>
  );
};

export default UserProgressInfo;
