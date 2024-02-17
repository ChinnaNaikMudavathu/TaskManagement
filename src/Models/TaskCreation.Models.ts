import { TASK_STATUS, TASK_STATUS_LABEL } from '../Constants/App';
import {NavigationProps, TaskStatus} from './Common.Models';

export interface TaskDetails {
  id: string;
  TaskTitle: string;
  TaskDescription: string;
  TaskStatus: TaskStatus;
  TaskCreationDate: string;
  taskStatusType: string;
}
interface TaskCreationRouteParams {
  isEditTask?: boolean;
  taskDetails: TaskDetails;
}

interface TaskCreationRoute {
  params: TaskCreationRouteParams;
}
export interface TaskCreationProps {
  navigation: NavigationProps;
  route: TaskCreationRoute;
}

export const AVAILABLE_TASKS_STATUS = [
  {
    label: TASK_STATUS_LABEL.ReadyToStart,
    value: TASK_STATUS.ReadyToStart
  },
  {
    label: TASK_STATUS_LABEL.InProgress,
    value: TASK_STATUS.InProgress
  },
  {
    label: TASK_STATUS_LABEL.InReview,
    value: TASK_STATUS.InReview
  },
  {
    label: TASK_STATUS_LABEL.OnHold,
    value: TASK_STATUS.OnHold
  },
  {
    label: TASK_STATUS_LABEL.Block,
    value: TASK_STATUS.Block
  },
  {
    label: TASK_STATUS_LABEL.Close,
    value: TASK_STATUS.Close
  },
  {
    label: TASK_STATUS_LABEL.Complete,
    value: TASK_STATUS.Complete
  }
]
