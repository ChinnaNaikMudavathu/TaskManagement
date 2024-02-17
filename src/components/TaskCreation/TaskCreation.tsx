import React, {useCallback, useState} from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TaskStatus} from '../../Models/Common.Models';

import {
  AVAILABLE_TASKS_STATUS,
  TaskCreationProps,
} from '../../Models/TaskCreation.Models';
import CreateTaskInput from './CreateTaskInput';

import TaskCreationStyles from './TaskCreation.styles';

const TaskCreation = (props: TaskCreationProps) => {
  const {route, navigation} = props || {};
  const {isEditTask = false, taskDetails} = route?.params || {};
  const [selectedTaskStatus, setSelectedTaskStatus] = useState(
    taskDetails?.TaskStatus?.value ?? '',
  );

  const handleOnPressSaveTaskDetails = useCallback(() => {
    navigation?.goBack();
  }, []);
  const handleOnPressMainContainer = useCallback(() => {
    Keyboard?.dismiss();
  }, []);
  const handleOnPressTaskSelect = useCallback((selectedTask: TaskStatus) => {
    setSelectedTaskStatus(selectedTask.value);
  }, []);
  return (
    <TouchableWithoutFeedback onPress={handleOnPressMainContainer}>
      <View style={TaskCreationStyles.TaskCreationContainer}>
        <View style={TaskCreationStyles.TaskCreationContentContainer}>
          <CreateTaskInput
            inputLabel={'Task Title:'}
            textInputProps={{
              multiline: true,
              numberOfLines: 2,
              placeholder: 'Enter Task Title...',
              value: taskDetails?.TaskTitle ?? '',
            }}
            containerStyle={TaskCreationStyles.ContainerStyle}
          />
          <CreateTaskInput
            inputLabel={'Task Title:'}
            textInputProps={{
              multiline: true,
              numberOfLines: 4,
              placeholder: 'Enter Task Description...',
              value: taskDetails?.TaskDescription ?? '',
            }}
            containerStyle={TaskCreationStyles.ContainerStyle}
          />
          <Text style={TaskCreationStyles.StatusTextLabel}>Task Status:</Text>
          <View style={TaskCreationStyles.TaskStatusContainer}>
            {AVAILABLE_TASKS_STATUS.map((taskStatus: TaskStatus) => {
              return (
                <TouchableOpacity
                  onPress={() => handleOnPressTaskSelect(taskStatus)}
                  style={TaskCreationStyles.TaskStatusButtonContainer(
                    selectedTaskStatus === taskStatus.value ? selectedTaskStatus : ''
                  )}>
                  <Text
                    style={TaskCreationStyles.TaskStatusText(
                      selectedTaskStatus === taskStatus.value,
                    )}>
                    {taskStatus.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={TaskCreationStyles.TaskCreationFooterContainer}>
          <TouchableOpacity
            style={TaskCreationStyles.SaveTaskButtonContainer}
            onPress={handleOnPressSaveTaskDetails}>
            <Text style={TaskCreationStyles.SaveTaskButtonText}>
              {isEditTask ? 'Update Task' : 'Save Task'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TaskCreation;
