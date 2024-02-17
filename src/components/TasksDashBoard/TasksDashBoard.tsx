import React from 'react';
import {View} from 'react-native';

import {DashBoardProps} from '../../Models/TasksDashBoard.Models';
import TasksList from '../TasksList';
import Timer from '../Timer/Timer';

import TasksDashBoardStyles from './TasksDashBoard.styles';

const TasksDashBoard = (props: DashBoardProps) => {
  const {navigation} = props || {};

  return (
    <View style={TasksDashBoardStyles.TasksDashBoardContainer}>
      <Timer />
      <TasksList navigation={navigation} />
    </View>
  );
};

export default TasksDashBoard;
