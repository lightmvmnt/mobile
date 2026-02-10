import {useTaskMetrics} from '@hooks/useTaskMetrics';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@services/navigation/Base.navigation';
import {useAppDispatch} from '@store/store';
import {getTask, updateTask} from '@store/tasks/tasks.thunk';
import {Task, UpdatedTaskPayload} from '@store/tasks/tasks.types';

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
