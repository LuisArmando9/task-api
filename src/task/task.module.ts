import { Module } from '@nestjs/common';
import { CreateTaskUsecaseImpl } from './core/application/create-task-usecase.impl';
import { DeleteTaskUsecaseImpl } from './core/application/delete-task-usecase.impl';
import { GetTaskUsecaseImpl } from './core/application/get-task-usecase.impl';
import { UpdateTaskUsecaseImpl } from './core/application/update-task-usecase.impl';
import { TaskRepository } from './core/domain/repositories/task.repository';
import { TaskRepositoryImpl } from './infrastructure/adapters/persistence/repositories/task-repository.impl';
import { CreateTaskUsecase } from './core/domain/usecase/create-task-usecase';
import { UpdateTaskUsecase } from './core/domain/usecase/update-task-usecase';
import { DeleteTaskUsecase } from './core/domain/usecase/delete-task-usecase';
import { GetTaskUsecase } from './core/domain/usecase/get-task-usecase';
import { TaskController } from './infrastructure/adapters/controllers/task-controller';
import { FirebaseHttps, EnumFirebaseFunctionVersion } from 'nestfire';
@Module({
  controllers: [TaskController],
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRepositoryImpl,
    },
    {
      provide: CreateTaskUsecase,
      useClass: CreateTaskUsecaseImpl,
    },
    {
      provide: GetTaskUsecase,
      useClass: GetTaskUsecaseImpl,
    },
    {
      provide: UpdateTaskUsecase,
      useClass: UpdateTaskUsecaseImpl,
    },
    {
      provide: DeleteTaskUsecase,
      useClass: DeleteTaskUsecaseImpl,
    },
  ],
})
export class TaskModule {}
