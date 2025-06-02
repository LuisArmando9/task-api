import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../domain/repositories/task.repository';
import { UpdateTaskUsecase } from '../domain/usecase/update-task-usecase';
import { TaskModel } from '../domain/models/task-model';
import { TaskNotFoundException } from '../domain/exceptions/task-exception';

@Injectable()
export class UpdateTaskUsecaseImpl implements UpdateTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async update(id: string, task: TaskModel): Promise<TaskModel> {
    const updatedTask = await this.taskRepository.update(id, task);
    if (!updatedTask) throw new TaskNotFoundException();
    return updatedTask;
  }
}
