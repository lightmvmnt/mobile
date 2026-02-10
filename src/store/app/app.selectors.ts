import {RootState} from '../store';

export const selectApp = (state: RootState) => state.app;
export const selectIsModalOpen = (state: RootState) => state.app.isModalOpen;
