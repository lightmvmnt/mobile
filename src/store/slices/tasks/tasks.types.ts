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

export interface GetCompletedTaskCountResponse {
  total_missions_completed: 0;
}

export interface TasksInitialState {
  tasks: Task[];
  loading: boolean;
  task_details: Task | null;
  task_details_loading: boolean;
  is_task_suggestion_modal_visible: boolean;
  completed_tasks_count: number;
  completed_tasks_count_loading: boolean;
}
