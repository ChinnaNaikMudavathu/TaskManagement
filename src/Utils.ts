import {TASK_STATUS} from './Constants/App';
import Colors from './Constants/Colors';

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
