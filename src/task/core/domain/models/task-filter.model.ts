import { TaskStatus } from "../enums/task-status.enum";
import { TaskModel } from "./task-model";

export type TaskFilters = Omit<TaskModel, 'id' | 'dueDate' | 'tags' | 'toJson' | 'createdAt'>;
