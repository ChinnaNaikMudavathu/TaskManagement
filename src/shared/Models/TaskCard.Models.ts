import { TaskStatus } from "./Common.Models";

export interface TaskCardProps {
    taskTitle: string;
    taskDescription: string;
    taskStatus: TaskStatus;
    taskCreationDate: string;
    handleOnPressTask: (taskId: string) => void;
}