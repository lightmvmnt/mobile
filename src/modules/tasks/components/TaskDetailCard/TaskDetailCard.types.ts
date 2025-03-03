import {Task} from '../../../../store/slices/tasks/tasks.types';

export interface Props {
  task: Task | null;
  task_loading?: boolean;
}
