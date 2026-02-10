import {RootState} from '../store';

export const selectTasks = (state: RootState) => state.tasks;
export const selectTasksList = (state: RootState) => state.tasks.tasks;
export const selectTasksPoints = (state: RootState) => state.tasks.tasksPoints;
export const selectTasksPointsLoading = (state: RootState) =>
  state.tasks.tasksPointsLoading;
export const selectIsTaskSuggestionModalVisible = (state: RootState) =>
  state.tasks.isTaskSuggestionModalVisible;
