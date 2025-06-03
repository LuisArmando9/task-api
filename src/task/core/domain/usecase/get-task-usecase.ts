import { CursorPagination, CursorPaginationParams } from "src/core/common/models/cursor.pagination";
import { TaskModel } from "../models/task-model";
import { TaskFilters } from "../models/task-filter.model";

export abstract class GetTaskUsecase {
    abstract getById(id: string): Promise<TaskModel>;
    abstract get(params: CursorPaginationParams, filters?: TaskFilters): Promise<CursorPagination<TaskModel>>;
}