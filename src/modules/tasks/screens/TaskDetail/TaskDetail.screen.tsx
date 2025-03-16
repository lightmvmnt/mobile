import React from 'react';
import {View} from 'react-native';
import {styles} from './TaskDetail.styles';
import {useAppSelector} from '../../../../store/store';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import {TaskDetailCard} from '../../components';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';

function TaskDetailScreen() {
  const {task_details, task_details_loading, loading} = useAppSelector(
    state => state.tasks,
  );

  return (
    <SafeAreaBackgroundWithHeader>
      {!task_details_loading ? (
        <View style={styles.detailPage}>
          <View style={styles.detailTaskContainer}>
            <TaskDetailCard task={task_details} task_loading={loading} />
          </View>
        </View>
      ) : (
        <ActivityIndicator animating={true} size={50} color={COLORS.MAIN} />
      )}
    </SafeAreaBackgroundWithHeader>
  );
}

export default TaskDetailScreen;
