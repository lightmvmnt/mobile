import React from 'react';
import {Props} from './TaskCard.types';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './TaskCard.styles';
import SupportLogo from '../../../../assets/icons/supportLogo.svg';
import DefuseLogo from '../../../../assets/icons/defuseLogo.svg';
import MobilizationLogo from '../../../../assets/icons/mobilizationLogo.svg';
import {
  CountIndicator,
  PointIndicator,
  SimpleButton,
} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';
import {useTask} from './TaskCard.hook';

function TaskCard({task}: Props) {
  const {
    completedCount,
    countLoading,
    taskPoint,
    tasksPointsLoading,
    onTaskUpdate,
    getToTaskDetailScreen,
  } = useTask(task);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => getToTaskDetailScreen()}
      style={styles.card}>
      <View style={styles.taskInfoContainer}>
        <CountIndicator loading={countLoading} count={completedCount} />
        {taskPoint !== null ? (
          <View style={styles.taskInfoWrapper}>
            <PointIndicator loading={tasksPointsLoading} point={taskPoint} />
          </View>
        ) : null}
      </View>

      <View style={styles.cardTopSide}>
        {task?.mission.category === 1 && <SupportLogo width={50} height={50} />}
        {task?.mission.category === 2 && (
          <MobilizationLogo width={50} height={50} />
        )}
        {task?.mission.category === 3 && <DefuseLogo width={50} height={50} />}
        <View style={styles.cardTopSideTextContainer}>
          <Text numberOfLines={2} style={styles.taskTitle}>
            {task?.mission.title}
          </Text>
        </View>
      </View>

      <View style={styles.cardBottomSide}>
        {task?.is_completed ? (
          <SimpleButton
            variant="contained"
            buttonColor={COLORS.GRAY}
            textColor={COLORS.DARK}
            onPress={() => onTaskUpdate({is_completed: false})}
            text={'შესრულებულია'}
            Icon={CompletedIcon}
            width={320}
            height={40}
          />
        ) : (
          <SimpleButton
            variant="contained"
            text={'დაწყება'}
            onPress={() => getToTaskDetailScreen()}
            width={320}
            height={40}
            buttonColor={COLORS.MAIN}
            textColor={COLORS.LIGHT}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(TaskCard);
