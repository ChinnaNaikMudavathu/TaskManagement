import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  PanResponder,
  Text,
  View,
} from 'react-native';

import TaskCard from '../TaskCard';

import {TasksListProps} from '../../Models/TasksList.Models';

import TasksListStyles from './TasksList.styles';
import {TASK_STATUS, TASK_STATUS_LABEL} from '../../Constants/App';
import NavigationScreens from '../../Constants/NavigationScreens';
import {TaskDetails} from '../../Models/TaskCreation.Models';
import {AsyncStorage, AsyncStorageKeys} from '../../AsyncStorage';
import {useFocusEffect} from '@react-navigation/native';


const TasksList = (props: TasksListProps) => {
  const {navigation} = props || {};
  const [tasks, setTasks] = useState([]);
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const [currentSwipingTaskId, setCurrentSwipingTaskId] = useState('');
  const [isTasksLoading, setIsTasksLoading] = useState(false);

  const fetchTasks = useCallback(() => {
    setIsTasksLoading(true);
    try {
      const availableTasks = AsyncStorage.getString(AsyncStorageKeys.TASKS);
      if (availableTasks) {
        setTasks(JSON.parse(availableTasks));
      }
    } catch (e: any) {
      console.log('Error occurred while fetching the tasks', JSON.stringify(e));
    } finally {
      setIsTasksLoading(false);
    }
  }, [setIsTasksLoading]);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  const handleOnDeleteTask = useCallback(
    (taskDetails: TaskDetails, isSwipeDelete: boolean) => {
      Alert.alert('Delete Task', 'Are you sure to delete the task', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            let modifiedTasks: TaskDetails[] = JSON.parse(
              AsyncStorage.getString(AsyncStorageKeys.TASKS) ?? ('[]' as string),
            );
            modifiedTasks = modifiedTasks.filter((task) => task.id !== taskDetails.id);
            AsyncStorage.set(AsyncStorageKeys.TASKS, JSON.stringify(modifiedTasks));
            fetchTasks();
            if (!isSwipeDelete) {
              navigation.goBack();
            }
          },
        },
      ]);
    },
    [navigation, fetchTasks],
  );

  const handleOnPressTask = useCallback((taskDetails: TaskDetails) => {
    navigation.navigate(NavigationScreens.TaskCreation, {
      isEditTask: true,
      handleOnDeleteTask,
      taskDetails,
    });
  }, []);

  const panResponder = (taskDetails: TaskDetails) => {
    let dx = 0;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        dx = gestureState.dx;
        if (dx > 0) {
          AnimatedValue.setValue(dx);
        }
      },
      onMoveShouldSetPanResponder: (_, gesture) => {
        if (gesture?.moveX > gesture?.moveY) {
          return false;
        }
        setCurrentSwipingTaskId(taskDetails?.id ?? '');
        return true;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (dx > 150) {
          handleOnDeleteTask(taskDetails, true);
        }
        Animated.timing(AnimatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
        setCurrentSwipingTaskId('');
      },
    });
  };

  const renderTask = useCallback(
    ({item}: {item: TaskDetails; index: number}) => {
      const {id, taskTitle, taskDescription, taskStatus, taskCreationDate} =
        item || {};
      return (
        <Animated.View
          {...panResponder(item).panHandlers}
          key={id}
          style={[
            TasksListStyles.TasksCardWrapper,
            {
              ...(currentSwipingTaskId === id
                ? {transform: [{translateX: AnimatedValue}]}
                : {}),
            },
          ]}>
          <TaskCard
            taskTitle={taskTitle}
            taskDescription={taskDescription}
            taskStatus={taskStatus}
            taskCreationDate={taskCreationDate}
            handleOnPressTask={() => handleOnPressTask(item)}
          />
        </Animated.View>
      );
    },
    [currentSwipingTaskId, AnimatedValue],
  );

  const renderEmptyTasksMessage = useCallback(() => {
    return (
      <Text style={TasksListStyles.EmptyTasksText}>
        No data fount. You can create tasks on click of Create Task button on
        top right of the screen.
      </Text>
    );
  }, []);

  const renderTasks = useCallback(() => {
    if (!tasks?.length) {
      return renderEmptyTasksMessage();
    }
    return (
      <FlatList
        data={tasks}
        extraData={tasks}
        keyExtractor={item => item?.id}
        renderItem={renderTask}
      />
    );
  }, [tasks, currentSwipingTaskId]);

  return (
    <View style={TasksListStyles.TaskListContainer}>
      {isTasksLoading ? <ActivityIndicator size={50} /> : renderTasks()}
    </View>
  );
};

export default TasksList;
