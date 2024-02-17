import React from 'react';
import {Text, TextInput, View} from 'react-native';

import {CreateTaskInputProps} from '../../../Models/CreateTaskInput.Models';

import CreateTaskInputStyles from './CreateTaskInput.styles';

const CreateTaskInput = (props: CreateTaskInputProps) => {
  const {textInputProps, inputLabel, containerStyle, inputRef} = props || {};
  return (
    <View style={containerStyle}>
      <Text style={CreateTaskInputStyles.CreateTaskInputLabel}>
        {inputLabel}
      </Text>
      <TextInput
        ref={inputRef}
        {...textInputProps}
        style={CreateTaskInputStyles.CreateTaskInputContainer}
      />
    </View>
  );
};

export default CreateTaskInput;
