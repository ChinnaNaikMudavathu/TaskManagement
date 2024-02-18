import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';

const CreateTaskInputStyles = StyleSheet.create({
  CreateTaskInputLabel: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '700',
    marginBottom: 12,
  },
  CreateTaskInputContainer: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: Colors.white,
    textAlignVertical: 'top',
    padding: 12,
  },
  InputErrorMessage: {color: Colors.red, fontSize: 16, marginVertical: 6},
});

export default CreateTaskInputStyles;
