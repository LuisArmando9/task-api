import { TaskStatus, TaskPriority } from '../enums/task-status.enum';

export class TaskModel {
  id: string;
  title: string;
  description?: string;
  isPending: boolean;
  priority: TaskPriority;
  dueDate?: string;
  userId: string;
  isArchived: boolean;
  createdAt: Date;

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      isPending: this.isPending,
      priority: this.priority,
      userId: this.userId,
      isArchived: this.isArchived,
      createdAt: this.createdAt ?? new Date(),
    };
  }
}
