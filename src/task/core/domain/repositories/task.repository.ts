import {
  CursorPaginationParams,
  CursorPagination,
} from 'src/core/common/models/cursor.pagination';
import { TaskModel } from '../models/task-model';
import { TaskFilters } from '../models/task-filter.model';

export abstract class TaskRepository {
  abstract create(task: TaskModel): Promise<TaskModel>;
  abstract getById(id: string): Promise<TaskModel | null>;
  abstract update(id: string, task: TaskModel): Promise<TaskModel | null>;
  abstract delete(id: string): Promise<void>;
  abstract getTasks(
    params: CursorPaginationParams,
    filters?: TaskFilters,
  ): Promise<CursorPagination<TaskModel>>;
}
