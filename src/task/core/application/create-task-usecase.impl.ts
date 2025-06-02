import { Injectable } from '@nestjs/common';
import { TaskModel } from '../domain/models/task-model';
import { CreateTaskUsecase } from '../domain/usecase/create-task-usecase';
import { TaskRepository } from '../domain/repositories/task.repository';

@Injectable()
export class CreateTaskUsecaseImpl implements CreateTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(task: TaskModel): Promise<TaskModel> {
    return this.taskRepository.create(task);
  }
}
