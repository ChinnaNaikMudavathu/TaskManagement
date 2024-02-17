import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';
import { getTaskStatusColor } from '../../Utils';

const TaskCardStyles = StyleSheet.create({
  TaskCardContainer: {
    borderRadius: 12,
    backgroundColor: Colors.white,
    padding: 16,
  },
  TaskCardContentContainer: {
    flexDirection: 'row',
  },
  TaskCardCreationDate: (taskStatus: string) => ({
    backgroundColor: getTaskStatusColor(taskStatus),
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  }),
  TaskCardCreationText: {color: Colors.white, fontSize: 12, fontWeight: '600'},
  TaskCardInfoContainer: {flex: 1},
  TaskCardTitle: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  TaskCardDescription: {color: Colors.gray, fontSize: 12, marginBottom: 8},
  TaskCardTaskStatus: (taskStatus: string) => ({
    color: getTaskStatusColor(taskStatus),
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  }),
});

export default TaskCardStyles;
