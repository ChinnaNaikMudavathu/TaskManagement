import React from 'react';
import { View } from 'react-native';

import MainStackNavigation from './routes';

import AppStyles from './App.styles'

const App = () => {
  return (
    <View style={AppStyles.AppContainer}>
      <MainStackNavigation />
    </View>
  );
};

export default App;
