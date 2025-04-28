import React from 'react';
import {View} from 'react-native';
import {styles} from './TaskDetail.styles';
import {useAppSelector} from '../../../../store/store';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import {TaskDetailCard} from '../../components';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import { TaskDetailScreenParams } from 'services/navigation/BottomTabStack/BottomTabStackNavigator';

const  TaskDetailScreen: React.FC<TaskDetailScreenParams> = ({}) => {
  const {taskDetails, taskDetailsLoading, loading} = useAppSelector(
    state => state.tasks,
  );

  return (
    <SafeAreaBackgroundWithHeader>
      {!taskDetailsLoading ? (
        <View style={styles.detailPage}>
          <View style={styles.detailTaskContainer}>
            <TaskDetailCard task={taskDetails} task_loading={loading} />
          </View>
        </View>
      ) : (
        <ActivityIndicator animating={true} size={50} color={COLORS.MAIN} />
      )}
    </SafeAreaBackgroundWithHeader>
  );
}

export default TaskDetailScreen;
