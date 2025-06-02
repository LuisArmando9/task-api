import { TaskModel } from "../models/task-model";

export abstract class CreateTaskUsecase {
    abstract create(task: TaskModel): Promise<TaskModel>;
}