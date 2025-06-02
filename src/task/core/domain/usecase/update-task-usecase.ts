import { TaskModel } from '../models/task-model';

export abstract class UpdateTaskUsecase {
  abstract update(id: string, task: TaskModel): Promise<TaskModel>;
}
