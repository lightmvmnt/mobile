import {useAppDispatch} from '../../../../store/store';
import {updateTask} from '../../../../store/thunks/tasks/tasks.thunk';
import {getTaskComplitionCount} from '../../../../services/tasks/getTaskComplitionCount';
import {Task, UpdatedTask} from '../../../../store/slices/tasks/tasks.types';
import {changeModalState} from '../../../../store/slices/app/app.slice';
import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {heightGenerator} from '../../../../utils/heightGenerator.util';

export const useTaskDetail = (task: Task | null) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);

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
      return heightGenerator() - 290;
    }

    return heightGenerator() - 230;
  };

  return {
    completedCount,
    countLoading,
    onLinkButtonPress,
    onDoneButtonPress,
    onLocationButtonPress,
    onMobilizationComingButtonPress,
    handleTaskDescriptionHeight,
  };
};
