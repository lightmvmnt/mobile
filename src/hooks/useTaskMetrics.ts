import {
  selectMissionCompletionCounts,
  selectMissionCompletionCountsLoading,
  selectTasksPoints,
  selectTasksPointsLoading,
} from '@store/tasks/tasks.selectors';
import {Task} from '@store/tasks/tasks.types';
import {useMemo} from 'react';

import {useAppSelector} from '../store/store';

export const useTaskMetrics = (task: Task | null) => {
  const missionCompletionCounts = useAppSelector(selectMissionCompletionCounts);
  const countLoading = useAppSelector(selectMissionCompletionCountsLoading);
  const tasksPoints = useAppSelector(selectTasksPoints);
  const tasksPointsLoading = useAppSelector(selectTasksPointsLoading);

  const completedCount = useMemo(() => {
    if (!task || !missionCompletionCounts.length) {
      return 0;
    }
    const entry = missionCompletionCounts.find(
      c => c.mission_id === task.mission.id,
    );
    return entry?.count ?? 0;
  }, [task, missionCompletionCounts]);

  const taskPoint = useMemo(() => {
    if (!tasksPoints.length || !task) {
      return null;
    }
    const task_point = tasksPoints.find(
      tasks => tasks.mission_id === task.mission.id,
    );
    return task_point?.points ?? null;
  }, [task, tasksPoints]);

  return {
    completedCount,
    countLoading,
    taskPoint,
    tasksPointsLoading,
  };
};
