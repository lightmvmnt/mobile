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

export interface UpdatedTask {
  is_completed: boolean;
}

export interface TasksInitialState {
  tasks: Task[];
  loading: boolean;
  task_details: Task | null;
  task_details_loading: boolean;
}
