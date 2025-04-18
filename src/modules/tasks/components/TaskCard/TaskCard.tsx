import React, {useEffect, useState} from 'react';
import {Props} from './TaskCard.types';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './TaskCard.styles';
import SupportLogo from '../../../../assets/icons/supportLogo.svg';
import DefuseLogo from '../../../../assets/icons/defuseLogo.svg';
import MobilizationLogo from '../../../../assets/icons/mobilizationLogo.svg';
import {SimpleButton} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import UserIcon from '../../../../assets/icons/userIcon.svg';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';
import {useAppDispatch} from '../../../../store/store';
import {getTask, updateTask} from '../../../../store/thunks/tasks/tasks.thunk';
import {UpdatedTask} from '../../../../store/slices/tasks/tasks.types';
import {getTaskComplitionCount} from '../../../../services/tasks/getTaskComplitionCount';
import {ActivityIndicator} from 'react-native-paper';
import { RootStackNavigatorProps } from 'services/navigation/RootStack/RootStackNavigator';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

function TaskCard({task}: Props) {
  const [completedCount, setCompletedCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCountLoading(true);
    const getCount = async () => {
      const {count} = await getTaskComplitionCount(task ? task.mission.id : 0);

      setCountLoading(false);
      setCompletedCount(count);
    };

    getCount();
  }, [task]);

  const onTaskUpdate = (updatedTask: UpdatedTask) => {
    if (task) {
      dispatch(updateTask({task_id: task.id, updated_task: updatedTask}));
    }
  };

  const getToTaskDetailScreen = () => {
    if (task) {
      dispatch(getTask(task.id));
      navigation.navigate('GlobalStack', {screen: 'TaskDetail'});
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => getToTaskDetailScreen()}
      style={styles.card}>
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
        <View style={styles.viewerIndicator}>
          {countLoading ? (
            <ActivityIndicator size={20} color={COLORS.MAIN} />
          ) : (
            <>
              <UserIcon width={15} height={15} />
              <Text style={styles.viewerIndicatorText}>{completedCount}</Text>
            </>
          )}
        </View>
        {task?.is_completed ? (
          <SimpleButton
            variant="contained"
            buttonColor={COLORS.GRAY}
            textColor={COLORS.DARK}
            onPress={() => onTaskUpdate({is_completed: false})}
            text={'შესრულებულია'}
            Icon={CompletedIcon}
            width={250}
            height={40}
          />
        ) : (
          <SimpleButton
            variant="contained"
            text={'დაწყება'}
            onPress={() => getToTaskDetailScreen()}
            width={250}
            height={40}
            buttonColor={COLORS.MAIN}
            textColor={COLORS.LIGHT}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default TaskCard;
