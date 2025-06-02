import { TaskModel } from "../models/task-model";

export abstract class GetTaskUsecase {
    abstract getById(id: string): Promise<TaskModel>;
}