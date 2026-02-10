import {Task} from '@store/tasks/tasks.types';

export interface Props {
  task: Task | null;
  task_loading?: boolean;
}
