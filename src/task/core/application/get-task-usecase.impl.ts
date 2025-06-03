import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../domain/repositories/task.repository";
import { TaskModel } from "../domain/models/task-model";
import { TaskNotFoundException } from "../domain/exceptions/task-exception";
import { GetTaskUsecase } from "../domain/usecase/get-task-usecase";
import { CursorPaginationParams, CursorPagination } from "src/core/common/models/cursor.pagination";
import { TaskFilters } from "../domain/models/task-filter.model";

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

    get(params: CursorPaginationParams, filters?: TaskFilters): Promise<CursorPagination<TaskModel>> {
        const MAX_LIMIT = 10;
        params.limit = params.limit > MAX_LIMIT ? MAX_LIMIT : params.limit;
        return this.taskRepository.getTasks(params , filters);
    }
}