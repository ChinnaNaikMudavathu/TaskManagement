import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {TaskCardProps} from '../../Models/TaskCard.Models';

import TaskCardStyles from './TaskCard.styles';

const TaskCard = (props: TaskCardProps) => {
  const {TaskTitle, TaskDescription, TaskStatus, TaskCreationDate, handleOnPressTask} =
    props || {};
  return (
    <TouchableOpacity onPress={handleOnPressTask} style={TaskCardStyles.TaskCardContainer}>
      <View style={TaskCardStyles.TaskCardContentContainer}>
        <View style={TaskCardStyles.TaskCardCreationDate(TaskStatus.value)}>
          <Text style={TaskCardStyles.TaskCardCreationText}>
            {TaskCreationDate}
          </Text>
        </View>
        <View style={TaskCardStyles.TaskCardInfoContainer}>
          <Text numberOfLines={2} style={TaskCardStyles.TaskCardTitle}>
            {TaskTitle}
          </Text>
          <Text numberOfLines={4} style={TaskCardStyles.TaskCardDescription}>
            {TaskDescription}
          </Text>
          <Text style={TaskCardStyles.TaskCardTaskStatus(TaskStatus.value)}>
            {TaskStatus.label}
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
