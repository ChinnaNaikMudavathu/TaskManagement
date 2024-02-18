import React from 'react';
import {Text, TextInput, View} from 'react-native';

import {CreateTaskInputProps} from '../../../Models/CreateTaskInput.Models';

import CreateTaskInputStyles from './CreateTaskInput.styles';

const CreateTaskInput = (props: CreateTaskInputProps) => {
  const {textInputProps, inputLabel, containerStyle, inputRef, inputError} =
    props || {};
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
      {inputError?.length ? (
        <Text style={CreateTaskInputStyles.InputErrorMessage}>
          {inputError}
        </Text>
      ) : null}
    </View>
  );
};

export default CreateTaskInput;
