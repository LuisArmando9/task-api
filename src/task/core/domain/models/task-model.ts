import { TaskStatus, TaskPriority } from '../enums/task-status.enum';

export class TaskModel {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  userId: string;
  tags?: string[];
  isArchived: boolean;
  createdAt: Date;

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      priority: this.priority,
      userId: this.userId,
      isArchived: this.isArchived,
      createdAt: this.createdAt ?? new Date(),
    };
  }
}
