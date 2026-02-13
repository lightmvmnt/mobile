import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  getCompletedTaskCount,
  getMissionCompletionCounts,
  getTask,
  getTasks,
  getTasksPoints,
  updateTask,
} from './tasks.thunk';
import {TasksInitialState} from './tasks.types';

const initialState: TasksInitialState = {
  tasks: [],
  loading: false,
  taskDetails: null,
  taskDetailsLoading: false,
  isTaskSuggestionModalVisible: false,
  completedTasksCount: 0,
  completedTasksCountLoading: false,
  tasksPoints: [],
  tasksPointsLoading: false,
  missionCompletionCounts: [],
  missionCompletionCountsLoading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changeTaskSuggestionModalVisibility: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isTaskSuggestionModalVisible = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, state => {
        state.loading = true;
      })
      .addCase(getTasks.rejected, state => {
        state.loading = false;
        state.tasks = [];
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(updateTask.pending, state => {
        state.loading = true;
      })
      .addCase(updateTask.rejected, state => {
        state.loading = false;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (state.taskDetails && state.taskDetails.id === action.payload.id) {
          state.taskDetails = action.payload;
        }
        state.tasks = state.tasks.map(task =>
          task.id === action.meta.arg.task_id ? action.payload : task,
        );
        state.loading = false;
      })
      .addCase(getTask.pending, state => {
        state.taskDetailsLoading = true;
      })
      .addCase(getTask.rejected, state => {
        state.taskDetailsLoading = false;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.taskDetails = action.payload;
        state.taskDetailsLoading = false;
      })
      .addCase(getCompletedTaskCount.pending, state => {
        state.completedTasksCountLoading = true;
      })
      .addCase(getCompletedTaskCount.fulfilled, (state, action) => {
        state.completedTasksCount = action.payload.total_missions_completed;
        state.completedTasksCountLoading = false;
      })
      .addCase(getCompletedTaskCount.rejected, state => {
        state.completedTasksCount = 0;
        state.completedTasksCountLoading = false;
      })
      .addCase(getTasksPoints.pending, state => {
        state.tasksPointsLoading = true;
      })
      .addCase(getTasksPoints.fulfilled, (state, action) => {
        state.tasksPoints = action.payload;
        state.tasksPointsLoading = false;
      })
      .addCase(getTasksPoints.rejected, state => {
        state.tasksPoints = [];
        state.tasksPointsLoading = false;
      })
      .addCase(getMissionCompletionCounts.pending, state => {
        state.missionCompletionCountsLoading = true;
      })
      .addCase(getMissionCompletionCounts.fulfilled, (state, action) => {
        state.missionCompletionCounts = action.payload;
        state.missionCompletionCountsLoading = false;
      })
      .addCase(getMissionCompletionCounts.rejected, state => {
        state.missionCompletionCounts = [];
        state.missionCompletionCountsLoading = false;
      });
  },
});

export const {changeTaskSuggestionModalVisibility} = tasksSlice.actions;

export default tasksSlice.reducer;
