import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {updateTask} from '../../../../store/thunks/tasks/tasks.thunk';
import {getTaskComplitionCount} from '../../../../services/tasks/getTaskComplitionCount';
import {Task} from '../../../../store/slices/tasks/tasks.types';
import {changeModalState} from '../../../../store/slices/app/app.slice';
import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {heightGenerator} from '../../../../utils/heightGenerator.util';
import {UpdatedTaskPayload} from '../../../../store/thunks/tasks/tasks.types';

export const useTaskDetail = (task: Task | null) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);
  const [taskPoint, setTaskPoint] = useState<number | null>(null);

  const {tasksPoints, tasksPointsLoading} = useAppSelector(
    state => state.tasks,
  );

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

  useEffect(() => {
    if (!tasksPoints.length || !task) {
      return;
    }

    const task_point = tasksPoints.find(
      tasks => tasks.mission_id === task.mission.id,
    );

    if (task_point) {
      setTaskPoint(task_point.points);
    }
  }, [task, tasksPoints]);

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
          modalButtonHandler: () => {},
          secondaryButtonTitle: 'გასაგებია',
        }),
      );
    }
  };

  const onLocationButtonPress = () => {
    console.log('open location');
  };

  const onMobilizationComingButtonPress = () => {
    console.log('coming on event');
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
