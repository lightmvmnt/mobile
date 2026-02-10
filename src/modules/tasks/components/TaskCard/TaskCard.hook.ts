import {Task} from '@store/tasks/tasks.types';
import {useAppDispatch} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {UpdatedTaskPayload} from '@store/tasks/tasks.types';
import {getTask, updateTask} from '@store/tasks/tasks.thunk';
import {useTaskMetrics} from '../../../../hooks/useTaskMetrics';

export const useTask = (task: Task | null) => {
  const {completedCount, countLoading, taskPoint, tasksPointsLoading} =
    useTaskMetrics(task);

  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  const onTaskUpdate = (updatedTask: UpdatedTaskPayload) => {
    if (task) {
      dispatch(updateTask({task_id: task.id, updated_task: updatedTask}));
    }
  };

  const getToTaskDetailScreen = () => {
    if (task) {
      dispatch(getTask(task.id));
      navigation.navigate('TaskDetail');
    }
  };

  return {
    completedCount,
    countLoading,
    taskPoint,
    tasksPointsLoading,
    onTaskUpdate,
    getToTaskDetailScreen,
  };
};
