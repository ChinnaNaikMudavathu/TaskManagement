import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Colors from '../../shared/Constants/Colors';
import { getTaskStatusColor } from '../../shared/Utils';

const TaskCreationStyles = StyleSheet.create({
  TaskCreationContainer: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 24,
    backgroundColor: Colors.lightGreen,
  },
  TaskCreationContentContainer: {},
  SaveTaskButtonContainer: {
    backgroundColor: Colors.blue,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SaveTaskButtonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: 'bold',
    padding: 16,
  },
  TaskCreationFooterContainer: {
    marginBottom: 16,
  },
  StatusTextLabel: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '700',
    marginBottom: 12,
  },
  ContainerStyle: {
    marginBottom: 12
  },
  TaskStatusContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20
  },
  TaskStatusButtonContainer: (taskStatus: string) => ({
      backgroundColor: getTaskStatusColor(taskStatus),
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
  }),
  TaskStatusText: (isSelected: boolean) => ({
      color: isSelected ? Colors.white : Colors.black,
      fontSize: isSelected ? 16 : 12,
      fontWeight: '600',
  }),
  InputErrorMessage: {color: Colors.red, fontSize: 16, marginVertical: 6},
});

export default TaskCreationStyles;
