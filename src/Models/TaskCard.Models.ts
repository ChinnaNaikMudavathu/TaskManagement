import { TaskStatus } from "./Common.Models";

export interface TaskCardProps {
    TaskTitle: string;
    TaskDescription: string;
    TaskStatus: TaskStatus;
    TaskCreationDate: string;
    handleOnPressTask: (taskId: string) => void;
}