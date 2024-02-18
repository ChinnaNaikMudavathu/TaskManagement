import {TASK_STATUS} from './Constants/App';
import Colors from './Constants/Colors';

import {CreateTaskInputProps} from './Models/Utils.Models';

export const getTaskStatusColor = (status: string): string => {
  let backGroundColor = Colors.white;
  switch (status) {
    case TASK_STATUS.ReadyToStart:
      backGroundColor = Colors.black;
      break;
    case TASK_STATUS.InProgress:
      backGroundColor = Colors.blue;
      break;
    case TASK_STATUS.InReview:
      backGroundColor = Colors.pink;
      break;
    case TASK_STATUS.OnHold:
      backGroundColor = Colors.yellow;
      break;
    case TASK_STATUS.Block:
      backGroundColor = Colors.red;
      break;
    case TASK_STATUS.Close:
      backGroundColor = Colors.darkPink;
      break;
    case TASK_STATUS.Complete:
      backGroundColor = Colors.green;
      break;
    default:
      backGroundColor = Colors.white;
  }
  return backGroundColor;
};

export const isValidTaskDetails = (taskDetails: CreateTaskInputProps) => {
  const taskDetailsErrors: CreateTaskInputProps = {
    title: '',
    description: '',
    taskStatus: '',
  };
  let isErrorOccurred = false;
  if (!taskDetails?.title?.length) {
    taskDetailsErrors.title = 'Please provide title.';
    isErrorOccurred = true;
  }

  if (!taskDetails?.description?.length) {
    taskDetailsErrors.description = 'Please provide description.';
    isErrorOccurred = true;
  }

  if (!taskDetails?.taskStatus?.length) {
    taskDetailsErrors.taskStatus = 'Please provide task status.';
    isErrorOccurred = true;
  }
  return {taskDetailsErrors, isErrorOccurred};
};
