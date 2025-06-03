import { TaskModel } from "src/task/core/domain/models/task-model";

export class TaskMapper {
    static toDomain(data: Record<string, unknown>): TaskModel {
        if (data?.createdAt) {
            const createdAtFromFirestore = data.createdAt as { _seconds: number, _nanoseconds: number };
            data.createdAt = new Date(
                createdAtFromFirestore._seconds * 1000 + createdAtFromFirestore._nanoseconds / 1e6
              );
          
        }
       
        return Object.assign(new TaskModel(), data);
    }
}