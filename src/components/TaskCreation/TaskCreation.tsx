import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AsyncStorageKeys,
  getAsyncStorageData,
  storeAsyncStorageData,
} from '../../AsyncStorage';
import Colors from '../../Constants/Colors';
import {TaskStatus} from '../../Models/Common.Models';

import {
  AVAILABLE_TASKS_STATUS,
  TaskCreationProps,
  TaskDetails,
} from '../../Models/TaskCreation.Models';
import {CreateTaskInputProps} from '../../Models/Utils.Models';
import {isValidTaskDetails} from '../../Utils';
import CreateTaskInput from './CreateTaskInput';

import TaskCreationStyles from './TaskCreation.styles';

const TaskCreation = (props: TaskCreationProps) => {
  const {route, navigation} = props || {};
  const {isEditTask = false, taskDetails} = route?.params || {};
  const [selectedTaskStatus, setSelectedTaskStatus] = useState<TaskStatus>(
    taskDetails?.taskStatus,
  );
  const [taskTitle, setTaskTitle] = useState(taskDetails?.taskTitle ?? '');
  const [taskDescription, setTaskDescription] = useState(
    taskDetails?.taskDescription ?? '',
  );
  const [taskDetailsError, setTaskDetailsError] =
    useState<CreateTaskInputProps>({
      title: '',
      description: '',
      taskStatus: '',
    });
  const [isAddTaskLoading, setIsAddTaskLoading] = useState(false);
  const handleOnPressSaveTaskDetails = useCallback(() => {
    setIsAddTaskLoading(true);
    try {
      const {taskDetailsErrors, isErrorOccurred} = isValidTaskDetails({
        title: taskTitle?.trim(),
        description: taskDescription?.trim(),
        taskStatus: selectedTaskStatus?.value?.trim(),
      });
      if (isErrorOccurred) {
        setTaskDetailsError(taskDetailsErrors);
      } else {
        const date = new Date();
        const timestamp = date.getUTCMilliseconds();
        const newTaskDetails = {
          id: timestamp?.toString(),
          taskTitle,
          taskDescription,
          taskCreationDate: `${date.getDate()}/${date.getMonth()}`,
          taskStatus: selectedTaskStatus,
        };
        let previousTasks: TaskDetails[] = JSON.parse(
          getAsyncStorageData(AsyncStorageKeys.TASKS) ?? ('[]' as string),
        );

        if (isEditTask) {
          //Update current Task Details
          const modifiedTasks = previousTasks.map((task: TaskDetails) => {
            if (task.id === taskDetails.id) {
              return newTaskDetails;
            }
            return task;
          });
          storeAsyncStorageData(AsyncStorageKeys.TASKS, modifiedTasks);
        } else {
          //Add new task details.
          const modifiedTasks = [newTaskDetails, ...previousTasks];
          storeAsyncStorageData(AsyncStorageKeys.TASKS, modifiedTasks);
        }
        setTimeout(() => {
          navigation?.goBack();
        }, 1000);
      }
    } catch (e: any) {
    } finally {
      setIsAddTaskLoading(false);
    }
  }, [taskTitle, taskDescription, selectedTaskStatus, setIsAddTaskLoading]);
  const handleOnPressMainContainer = useCallback(() => {
    Keyboard?.dismiss();
  }, []);
  const handleOnPressTaskSelect = useCallback(
    (selectedTask: TaskStatus) => {
      setTaskDetailsError(prevErrors => {
        return {...prevErrors, taskStatus: ''};
      });
      setSelectedTaskStatus(selectedTask);
    },
    [setTaskDetailsError],
  );
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
              value: taskTitle,
              onChangeText: (title: string) => {
                if (title.trim()) {
                  setTaskDetailsError(prevErrors => {
                    return {...prevErrors, title: ''};
                  });
                }
                setTaskTitle(title);
              },
            }}
            inputError={taskDetailsError.title}
            containerStyle={TaskCreationStyles.ContainerStyle}
          />
          <CreateTaskInput
            inputLabel={'Task Title:'}
            textInputProps={{
              multiline: true,
              numberOfLines: 4,
              placeholder: 'Enter Task Description...',
              value: taskDescription,
              onChangeText: (description: string) => {
                if (description.trim()) {
                  setTaskDetailsError(prevErrors => {
                    return {...prevErrors, description: ''};
                  });
                }
                setTaskDescription(description);
              },
            }}
            inputError={taskDetailsError.description}
            containerStyle={TaskCreationStyles.ContainerStyle}
          />
          <Text style={TaskCreationStyles.StatusTextLabel}>Task Status:</Text>
          <View style={TaskCreationStyles.TaskStatusContainer}>
            {AVAILABLE_TASKS_STATUS.map((taskStatus: TaskStatus) => {
              return (
                <TouchableOpacity
                  key={taskStatus.value}
                  onPress={() => handleOnPressTaskSelect(taskStatus)}
                  style={TaskCreationStyles.TaskStatusButtonContainer(
                    selectedTaskStatus?.value === taskStatus?.value
                      ? selectedTaskStatus?.value
                      : '',
                  )}>
                  <Text
                    style={TaskCreationStyles.TaskStatusText(
                      selectedTaskStatus?.value === taskStatus?.value,
                    )}>
                    {taskStatus.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {taskDetailsError?.taskStatus.length ? (
            <Text style={TaskCreationStyles.InputErrorMessage}>
              {taskDetailsError.taskStatus}
            </Text>
          ) : null}
        </View>
        <View style={TaskCreationStyles.TaskCreationFooterContainer}>
          <TouchableOpacity
            disabled={isAddTaskLoading}
            style={TaskCreationStyles.SaveTaskButtonContainer}
            onPress={handleOnPressSaveTaskDetails}>
            {isAddTaskLoading ? (
              <ActivityIndicator size={20} color={Colors.black} />
            ) : (
              <Text style={TaskCreationStyles.SaveTaskButtonText}>
                {isEditTask ? 'Update Task' : 'Save Task'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TaskCreation;
