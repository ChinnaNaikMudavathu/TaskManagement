import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

const TasksListStyles = StyleSheet.create({
  TaskListContainer: {
    flex: 1,
  },
  TasksCardWrapper: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  EmptyTasksText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
    margin: 24,
    color: Colors.black,
  },
});

export default TasksListStyles;
