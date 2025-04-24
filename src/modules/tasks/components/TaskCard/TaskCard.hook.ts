import {useEffect, useState} from 'react';
import {Task} from '../../../../store/slices/tasks/tasks.types';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getTaskComplitionCount} from '../../../../services/tasks/getTaskComplitionCount';
import {UpdatedTaskPayload} from '../../../../store/thunks/tasks/tasks.types';
import {getTask, updateTask} from '../../../../store/thunks/tasks/tasks.thunk';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

export const useTask = (task: Task | null) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);
  const [taskPoint, setTaskPoint] = useState<number | null>(null);

  const {tasksPoints, tasksPointsLoading} = useAppSelector(
    state => state.tasks,
  );

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

  const getToTaskDetailScreen = () => {
    if (task) {
      dispatch(getTask(task.id));
      navigation.navigate('GlobalStack', {screen: 'TaskDetail'});
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
