import {useTaskMetrics} from '@hooks/useTaskMetrics';
import {changeModalState} from '@store/app/app.slice';
import {useAppDispatch} from '@store/store';
import {updateTask} from '@store/tasks/tasks.thunk';
import {Task, UpdatedTaskPayload} from '@store/tasks/tasks.types';
import {heightGenerator} from '@utils/heightGenerator.util';
import {Linking} from 'react-native';

export const useTaskDetail = (task: Task | null) => {
  const {completedCount, countLoading, taskPoint, tasksPointsLoading} =
    useTaskMetrics(task);

  const dispatch = useAppDispatch();

  const onTaskUpdate = (updatedTask: UpdatedTaskPayload) => {
    if (task) {
      dispatch(updateTask({task_id: task.id, updated_task: updatedTask}));
    }
  };

  const onLinkButtonPress = () => {
    if (!task) {
      return;
    }

    onTaskUpdate({is_completed: true});
    Linking.openURL(task.mission.target_url);
  };

  const onDoneButtonPress = () => {
    if (!task) {
      return;
    }

    if (task.is_completed) {
      onTaskUpdate({is_completed: false});
    } else {
      dispatch(
        changeModalState({
          isModalOpen: true,
          modalDescription:
            'მისიის შესასრულებლად გადადი მოცემულ ბმულზე და შეასრულე დავალება',
          secondaryButtonTitle: 'გასაგებია',
        }),
      );
    }
  };

  const onLocationButtonPress = () => {
    // TODO: implement location opening
  };

  const onMobilizationComingButtonPress = () => {
    // TODO: implement mobilization event attendance
  };

  const handleTaskDescriptionHeight = () => {
    if (!task) {
      return;
    }

    if (task.mission.category === 2) {
      return heightGenerator() - 320;
    }

    return heightGenerator() - 275;
  };

  return {
    completedCount,
    countLoading,
    taskPoint,
    tasksPointsLoading,
    onLinkButtonPress,
    onDoneButtonPress,
    onLocationButtonPress,
    onMobilizationComingButtonPress,
    handleTaskDescriptionHeight,
  };
};
