import {useEffect, useState} from 'react';
import {Task} from '@store/tasks/tasks.types';
import {useAppSelector} from '../store/store';
import {selectTasksPoints, selectTasksPointsLoading} from '@store/tasks/tasks.selectors';
import {getTaskComplitionCount} from '../services/tasks/getTaskComplitionCount';

export const useTaskMetrics = (task: Task | null) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);
  const [taskPoint, setTaskPoint] = useState<number | null>(null);

  const tasksPoints = useAppSelector(selectTasksPoints);
  const tasksPointsLoading = useAppSelector(selectTasksPointsLoading);

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

  return {
    completedCount,
    countLoading,
    taskPoint,
    tasksPointsLoading,
  };
};
