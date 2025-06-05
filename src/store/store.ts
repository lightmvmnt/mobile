import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth/auth.slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import tasksReducer from './slices/tasks/tasks.slice';
import appReducer from './slices/app/app.slice';
import pollsReducer from './slices/polls/polls.slice';
import referralReducer from './slices/referral/referral.slice';
import profileRecucer from './slices/profile/profile.slice';
import representativesReducer from './slices/representatives/representatives.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    app: appReducer,
    polls: pollsReducer,
    referral: referralReducer,
    profile: profileRecucer,
    representatives: representativesReducer,
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
