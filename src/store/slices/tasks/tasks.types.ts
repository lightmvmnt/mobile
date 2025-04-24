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
}
