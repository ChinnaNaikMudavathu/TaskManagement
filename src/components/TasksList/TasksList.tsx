import React, {useCallback, useEffect, useRef, useState} from 'react';
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

import {TasksListProps} from '../../shared/Models/TasksList.Models';

import TasksListStyles from './TasksList.styles';
import NavigationScreens from '../../shared/Constants/NavigationScreens';
import {TaskDetails} from '../../shared/Models/TaskCreation.Models';
import {
  AsyncStorageKeys,
  getAsyncStorageData,
  storeAsyncStorageData,
} from '../../AsyncStorage';
import {useFocusEffect} from '@react-navigation/native';
import {showToast} from '../../shared/Utils';
import {NUMBER_OF_ITEMS_PER_BATCH} from '../../shared/Constants/App';

const TasksList = (props: TasksListProps) => {
  const {navigation} = props || {};
  const [tasks, setTasks] = useState<TaskDetails[]>([]);
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const [currentSwipingTaskId, setCurrentSwipingTaskId] = useState('');
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const isShowSwipeToDeleteTaskAnimation = useRef(false);

  const fetchTasks = useCallback(() => {
    setIsTasksLoading(true);
    try {
      const availableTasks: TaskDetails[] = getAsyncStorageData(
        AsyncStorageKeys.TASKS,
      );
      if (availableTasks) {
        setTasks(availableTasks);
      } else {
        setTasks([]);
      }
    } catch (e: any) {
      console.log('Error occurred while fetching the tasks', JSON.stringify(e));
    } finally {
      setIsTasksLoading(false);
    }
  }, [setIsTasksLoading]);

  const showSwipeToDeleteTaskAnimation = useCallback(() => {
    try{
      Animated.timing(AnimatedValue, {
        toValue: 150,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(AnimatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          storeAsyncStorageData(
            AsyncStorageKeys.IS_USER_AWARE_OF_SWIPE_TO_DELETE_TASK,
            true,
          );
          setCurrentSwipingTaskId('');
          isShowSwipeToDeleteTaskAnimation.current = false;
        });
      });
    }catch(e: any){
      console.log("Error occurred while show swipe to delete animation", JSON.parse(e));
    }
  } ,[AnimatedValue, setCurrentSwipingTaskId])

  const isShowAnimationForSwipeRightToDeleteTask = useCallback(() => {
    try {
      const isUserSwipeToDeleteFeatureSeen = getAsyncStorageData(
        AsyncStorageKeys.IS_USER_AWARE_OF_SWIPE_TO_DELETE_TASK,
      );
      if (!isUserSwipeToDeleteFeatureSeen) {
        isShowSwipeToDeleteTaskAnimation.current = true;
        setCurrentSwipingTaskId(tasks[0]?.id ?? '');
      }
    } catch (e: any) {
      console.log('Error while fetching swipe to delete flag', JSON.parse(e));
    }
  }, [AnimatedValue, getAsyncStorageData, tasks]);

  useEffect(() => {
    if (tasks?.length && !currentSwipingTaskId?.length) {
      setTimeout(() => {
        isShowAnimationForSwipeRightToDeleteTask();
      }, 1000);
    }
    if(tasks?.length && isShowSwipeToDeleteTaskAnimation.current && currentSwipingTaskId?.length){ //Show swipe to delete user only once to make awareness of swipe to delete task.
      showSwipeToDeleteTaskAnimation();
    }
  }, [tasks, currentSwipingTaskId]);

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
            let modifiedTasks: TaskDetails[] = getAsyncStorageData(
              AsyncStorageKeys.TASKS,
            );
            modifiedTasks = modifiedTasks.filter(
              task => task.id !== taskDetails.id,
            );
            storeAsyncStorageData(AsyncStorageKeys.TASKS, modifiedTasks);
            fetchTasks();
            showToast('Task successfully deleted.');
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
        initialNumToRender={NUMBER_OF_ITEMS_PER_BATCH}
        maxToRenderPerBatch={NUMBER_OF_ITEMS_PER_BATCH}
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
