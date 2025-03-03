import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth/auth.slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import tasksReducer from './slices/tasks/tasks.slice';
import appReducer from './slices/app/app.slice';
import PollsReducer from './slices/polls/polls.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    app: appReducer,
    polls: PollsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
