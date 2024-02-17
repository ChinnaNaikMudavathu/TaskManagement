import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TASK_STATUS, TASK_STATUS_LABEL } from "../Constants/App";

export type NavigationProps = NativeStackNavigationProp<any, any>;

export interface TaskStatus {
    label: TASK_STATUS_LABEL,
    value: TASK_STATUS
}