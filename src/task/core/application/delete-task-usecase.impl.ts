import { Injectable } from '@nestjs/common';
import { DeleteTaskUsecase } from '../domain/usecase/delete-task-usecase';
import { TaskRepository } from '../domain/repositories/task.repository';

@Injectable()
export class DeleteTaskUsecaseImpl implements DeleteTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async delete(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
