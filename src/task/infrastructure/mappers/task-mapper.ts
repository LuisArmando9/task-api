import { TaskModel } from "src/task/core/domain/models/task-model";

export class TaskMapper {
    static toDomain(data: Record<string, unknown>): TaskModel {
        return Object.assign(new TaskModel(), data);
    }
}