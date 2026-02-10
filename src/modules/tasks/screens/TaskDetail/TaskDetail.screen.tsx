import {SafeAreaBackgroundWithHeader} from '@components';
import {COLORS} from '@constants';
import {useAppSelector} from '@store/store';
import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {TaskDetailCard} from '../../components';
import {styles} from './TaskDetail.styles';

function TaskDetailScreen() {
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
