import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../domain/repositories/task.repository";
import { TaskModel } from "../domain/models/task-model";
import { TaskNotFoundException } from "../domain/exceptions/task-exception";
import { GetTaskUsecase } from "../domain/usecase/get-task-usecase";

@Injectable()
export  class GetTaskUsecaseImpl implements GetTaskUsecase {
    constructor(
        private readonly taskRepository: TaskRepository,
    ){}

    async getById(id: string): Promise<TaskModel> {
        const task = await this.taskRepository.getById(id);
        if (!task) throw new TaskNotFoundException();
        return task;

    }
}