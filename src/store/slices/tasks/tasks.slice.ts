import {createSlice} from '@reduxjs/toolkit';
import {TasksInitialState} from './tasks.types';
import {
  getCompletedTaskCount,
  getTask,
  getTasks,
  updateTask,
} from '../../thunks/tasks/tasks.thunk';

const initialState: TasksInitialState = {
  tasks: [],
  loading: false,
  task_details: null,
  task_details_loading: false,
  is_task_suggestion_modal_visible: false,
  completed_tasks_count: 0,
  completed_tasks_count_loading: false,
};

export const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changeTaskSuggestionModalVisibility: (
      state,
      action: {payload: boolean},
    ) => {
      state.is_task_suggestion_modal_visible = action.payload;
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
        if (state.task_details && state.task_details.id === action.payload.id) {
          state.task_details = action.payload;
        }
        state.tasks = state.tasks.map(task =>
          task.id === action.meta.arg.task_id ? action.payload : task,
        );
        state.loading = false;
      })
      .addCase(getTask.pending, state => {
        state.task_details_loading = true;
      })
      .addCase(getTask.rejected, state => {
        state.task_details_loading = false;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.task_details = action.payload;
        state.task_details_loading = false;
      })
      .addCase(getCompletedTaskCount.pending, state => {
        state.completed_tasks_count_loading = true;
      })
      .addCase(getCompletedTaskCount.fulfilled, (state, action) => {
        state.completed_tasks_count = action.payload.total_missions_completed;
        state.completed_tasks_count_loading = false;
      })
      .addCase(getCompletedTaskCount.rejected, state => {
        state.completed_tasks_count = 0;
        state.completed_tasks_count_loading = false;
      });
  },
});

export const {changeTaskSuggestionModalVisibility} = TasksSlice.actions;

export default TasksSlice.reducer;
