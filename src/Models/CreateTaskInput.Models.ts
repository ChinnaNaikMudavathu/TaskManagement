import { TextInputProps, ViewStyle } from "react-native";

export interface CreateTaskInputProps {
    inputLabel?: string,
    textInputProps?: TextInputProps,
    containerStyle?: ViewStyle;
    inputRef?: any
}