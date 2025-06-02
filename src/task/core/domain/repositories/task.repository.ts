import { TaskModel } from "../models/task-model";

export abstract class TaskRepository {
    abstract create(task: TaskModel): Promise<TaskModel>;
    abstract getById(id: string): Promise<TaskModel | null>;
    abstract update(id: string, task: TaskModel): Promise<TaskModel | null>;
    abstract delete(id: string): Promise<void>;
    
}