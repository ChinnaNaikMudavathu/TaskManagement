import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import TaskCard from '../TaskCard';

import {TasksListProps} from '../../Models/TasksList.Models';

import TasksListStyles from './TasksList.styles';
import {TASK_STATUS, TASK_STATUS_LABEL} from '../../Constants/App';
import NavigationScreens from '../../Constants/NavigationScreens';
import { TaskDetails } from '../../Models/TaskCreation.Models';

const DUMMY_TASKS = [
  {
    id: '1',
    TaskTitle:
      '1 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '1 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
    TaskCreationDate: '01/20',
    TaskStatus: {
      label: TASK_STATUS_LABEL.ReadyToStart,
      value: TASK_STATUS.ReadyToStart
    }
  },
  {
    id: '2',
    TaskTitle:
      '2 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '2 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.InProgress,
        value: TASK_STATUS.InProgress
      }
  },
  {
    id: '3',
    TaskTitle:
      '3 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '3 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.InReview,
        value: TASK_STATUS.InReview
      }
  },
  {
    id: '4',
    TaskTitle:
      '4 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '4 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.OnHold,
        value: TASK_STATUS.OnHold
      }
  },
  {
    id: '5',
    TaskTitle:
      '5 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '5 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.Block,
        value: TASK_STATUS.Block
      }
  },
  {
    id: '6',
    TaskTitle:
      '6 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '6 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
    TaskStatus: {
      label: TASK_STATUS_LABEL.Close,
      value: TASK_STATUS.Close
    }
  },
  {
    id: '7',
    TaskTitle:
      '7 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '7 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.Complete,
        value: TASK_STATUS.Complete
      }
  },
  {
    id: '8',
    TaskTitle:
      '8 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '8 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '9',
    TaskTitle:
      '9 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '9 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '10',
    TaskTitle:
      '10 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '10 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '11',
    TaskTitle:
      '11 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '11 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '12',
    TaskTitle:
      '12 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '12 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '13',
    TaskTitle:
      '13 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '13 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
    TaskStatus: {
      label: TASK_STATUS_LABEL.ReadyToStart,
      value: TASK_STATUS.ReadyToStart
    }
  },
  {
    id: '14',
    TaskTitle:
      '14 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '14 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '15',
    TaskTitle:
      '15 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '15 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
    TaskStatus: {
      label: TASK_STATUS_LABEL.ReadyToStart,
      value: TASK_STATUS.ReadyToStart
    }
  },
  {
    id: '16',
    TaskTitle:
      '16 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '16 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '17',
    TaskTitle:
      '17 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '17 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '18',
    TaskTitle:
      '18 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '18 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '19',
    TaskTitle:
      '19 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '19 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
  {
    id: '20',
    TaskTitle:
      '20 Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title',
    TaskDescription:
      '20 Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description',
      TaskCreationDate: '01/20',
      TaskStatus: {
        label: TASK_STATUS_LABEL.ReadyToStart,
        value: TASK_STATUS.ReadyToStart
      }
  },
];

const TasksList = (props: TasksListProps) => {
  const {navigation} = props || {};
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(DUMMY_TASKS);
  }, []);

  const handleOnDeleteTask = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleOnPressTask = useCallback((taskDetails: TaskDetails) => {
    navigation.navigate(NavigationScreens.TaskCreation, {
      isEditTask: true,
      handleOnDeleteTask,
      taskDetails,
    });
  }, []);

  const renderTask = ({item}) => {
    const {
      id,
      TaskTitle,
      TaskDescription,
      TaskStatus,
      TaskCreationDate,
    } = item || {};
    return (
      <View key={id} style={TasksListStyles.TasksCardWrapper}>
        <TaskCard
          TaskTitle={TaskTitle}
          TaskDescription={TaskDescription}
          TaskStatus={TaskStatus}
          TaskCreationDate={TaskCreationDate}
          handleOnPressTask={() => handleOnPressTask(item)}
        />
      </View>
    );
  };
  return (
    <View style={TasksListStyles.TaskListContainer}>
      <FlatList
        data={tasks}
        extraData={tasks}
        keyExtractor={item => item?.id}
        renderItem={renderTask}
      />
    </View>
  );
};

export default TasksList;
