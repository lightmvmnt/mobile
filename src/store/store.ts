import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import appReducer from './app/app.slice';
import authReducer from './auth/auth.slice';
import pollsReducer from './polls/polls.slice';
import profileReducer from './profile/profile.slice';
import referralReducer from './referral/referral.slice';
import representativesReducer from './representatives/representatives.slice';
import tasksReducer from './tasks/tasks.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    app: appReducer,
    polls: pollsReducer,
    referral: referralReducer,
    profile: profileReducer,
    representatives: representativesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
