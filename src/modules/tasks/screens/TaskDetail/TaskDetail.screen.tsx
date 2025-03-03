import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import SafeAreaBackgroundWithHeader from '../../../../core/components/SafeAreaBackgroundWithHeader';
import {styles} from './TaskDetail.styles';
import {useAppSelector} from '../../../../store/store';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import {TaskDetailCard} from '../../components';
import {ScreenHeader} from '../../../../globalComponents';
import MobilizationTaskDetailCard from '../../components/MobilizationTaskDetailCard';

function TaskDetailScreen() {
  const {task_details, task_details_loading, loading} = useAppSelector(
    state => state.tasks,
  );

  const [taskCategory, setTaskCategory] = useState('');

  useEffect(() => {
    if (!task_details) {
      return;
    }

    switch (task_details.mission.category) {
      case 1:
        setTaskCategory('მხარდაჭერა');
        break;
      case 2:
        setTaskCategory('მობილიზაცია');
        break;
      case 3:
        setTaskCategory('განეიტრალება');
        break;
      default:
        break;
    }
  }, [task_details]);

  return (
    <SafeAreaBackgroundWithHeader>
      {!task_details_loading ? (
        <View style={styles.detailPage}>
          <ScreenHeader title={`მისია: ${taskCategory}`} />
          <View style={styles.detailTaskContainer}>
            {task_details?.mission.category === 2 ? (
              <MobilizationTaskDetailCard
                task={task_details}
                task_loading={loading}
              />
            ) : (
              <TaskDetailCard task={task_details} task_loading={loading} />
            )}
          </View>
        </View>
      ) : (
        <ActivityIndicator animating={true} size={50} color={COLORS.MAIN} />
      )}
    </SafeAreaBackgroundWithHeader>
  );
}

export default TaskDetailScreen;
