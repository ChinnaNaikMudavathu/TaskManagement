import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {TaskCardProps} from '../../Models/TaskCard.Models';

import TaskCardStyles from './TaskCard.styles';

const TaskCard = (props: TaskCardProps) => {
  const {taskTitle, taskDescription, taskStatus, taskCreationDate, handleOnPressTask} =
    props || {};
  return (
    <TouchableOpacity onPress={handleOnPressTask} style={TaskCardStyles.TaskCardContainer}>
      <View style={TaskCardStyles.TaskCardContentContainer}>
        <View style={TaskCardStyles.TaskCardCreationDate(taskStatus?.value)}>
          <Text style={TaskCardStyles.TaskCardCreationText}>
            {taskCreationDate}
          </Text>
        </View>
        <View style={TaskCardStyles.TaskCardInfoContainer}>
          <Text numberOfLines={2} style={TaskCardStyles.TaskCardTitle}>
            {taskTitle}
          </Text>
          <Text numberOfLines={4} style={TaskCardStyles.TaskCardDescription}>
            {taskDescription}
          </Text>
          <Text style={TaskCardStyles.TaskCardTaskStatus(taskStatus?.value)}>
            {taskStatus?.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

TaskCard.defaultProps = {
  TaskTitle: '',
  TaskDescription: '',
  TaskStatus: '',
  TaskCreationDate: '',
  handleOnPressTask: () => {},
};

export default TaskCard;
