import React from 'react';

import {Image, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashBoard from '../components/TasksDashBoard';
import TaskCreation from '../components/TaskCreation';

import {CreateIcon, DeleteIcon} from '../assets/Icons';

import NavigationScreens from '../Constants/NavigationScreens';

const MainStack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name={NavigationScreens.TasksDashBoard}
          component={DashBoard}
          options={({navigation}) => ({
            headerTitle: 'Tasks Dashboard',
            headerTitleStyle: {
              fontFamily: 'Manrope-SemiBold',
              fontSize: 20,
            },
            animation: 'slide_from_right',
            headerRight: () => (
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => {
                  navigation.navigate(NavigationScreens.TaskCreation);
                }}>
                <Text style={{ fontSize: 20, fontWeight: '400', color: '#000000', marginRight: 6 }}>Create Task</Text>
                <Image style={{width: 20, height: 25}} source={CreateIcon} />
              </TouchableOpacity>
            ),
          })}
        />
        <MainStack.Screen
          name={NavigationScreens.TaskCreation}
          component={TaskCreation}
          options={({route}) => {
            const {isEditTask = false, handleOnDeleteTask = () => {}, taskDetails = {}} =
              route?.params ?? {};
            return {
              headerTitle: isEditTask ? 'Update Task' : 'Create Task',
              headerTitleStyle: {
                fontFamily: 'Manrope-SemiBold',
                fontSize: 20,
              },
              animation: 'slide_from_right',
              headerRight: () =>
                isEditTask ? (
                  <TouchableOpacity onPress={() => handleOnDeleteTask(taskDetails)}>
                    <Image
                      style={{width: 20, height: 20}}
                      source={DeleteIcon}
                    />
                  </TouchableOpacity>
                ) : null,
            };
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
