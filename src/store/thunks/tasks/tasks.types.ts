import {NavigationProps} from '../../../core/routing/Base.routing';
import {UpdatedTask} from '../../slices/tasks/tasks.types';

export interface GetTaskTypes {
  session_token: string;
  user_id: number;
  access_token: string;
  navigation: NavigationProps;
}

export interface sendDeviceIdForTasksTypes {
  session_token: string;
  device_id: string;
  access_token: string;
  token: string;
}

export interface UpdateTaskTypes {
  task_id: number;
  updated_task: UpdatedTask;
}
