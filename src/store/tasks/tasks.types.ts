import {NavigationProps} from '../../services/navigation/Base.navigation';

export interface Task {
  id: number;
  mission: {
    id: number;
    category: number;
    description: string;
    status: string;
    target_url: string;
    title: string;
  };
  is_completed: boolean;
}

export interface TaskResponse extends Task {}

export interface TaskPoints {
  mission_id: number;
  points: number;
}

export interface TasksInitialState {
  tasks: Task[];
  loading: boolean;
  taskDetails: Task | null;
  taskDetailsLoading: boolean;
  isTaskSuggestionModalVisible: boolean;
  completedTasksCount: number;
  completedTasksCountLoading: boolean;
  tasksPoints: TaskPoints[];
  tasksPointsLoading: boolean;
  missionCompletionCounts: MissionCompletionCount[];
  missionCompletionCountsLoading: boolean;
  error: string | null;
}

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

export interface UpdatedTaskPayload {
  is_completed: boolean;
}

export interface UpdateTaskTypes {
  task_id: number;
  updated_task: UpdatedTaskPayload;
}

export interface GetCompletedTaskCountResponse {
  total_missions_completed: number;
}

export interface GetTaskPointsResponse {
  mission_id: number;
  points: number;
}

export interface MissionCompletionCount {
  mission_id: number;
  count: number;
}
