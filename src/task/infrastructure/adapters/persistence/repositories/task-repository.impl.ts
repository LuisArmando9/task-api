import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { InjectDatabase } from 'src/core/config/db/firestore-config.db';
import { TaskModel } from 'src/task/core/domain/models/task-model';
import { TaskRepository } from 'src/task/core/domain/repositories/task.repository';
import { TaskMapper } from 'src/task/infrastructure/mappers/task-mapper';
import { v4 } from 'uuid';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  private readonly collection = 'tasks';
  private readonly tasksRef: firestore.CollectionReference<firestore.DocumentData>;
  constructor(
    @InjectDatabase() private readonly database: firestore.Firestore,
  ) {
    this.tasksRef = this.database.collection(this.collection);
  }
  async create(task: TaskModel): Promise<TaskModel> {
    task.id = v4();
    const taskData = task.toJson();
    await this.tasksRef.doc(task.id).set(taskData);
    return task;
  }

  async getById(id: string): Promise<TaskModel | null> {
    const snapshot = await this.tasksRef.where('id', '==', id).limit(1).get();

    if (snapshot.empty) {
      return null;
    }

    const [doc] = snapshot.docs;
    return TaskMapper.toDomain(doc.data());
  }

  async update(id: string, task: TaskModel): Promise<TaskModel | null> {
    const snapshot = await this.tasksRef.where('id', '==', id).limit(1).get();
    if (snapshot.empty) return null;
    const [doc] = snapshot.docs;
    const updatedData = {
      ...task.toJson(),
      updatedAt: new Date().toISOString(),
    };

    await doc.ref.update(updatedData);

    return TaskMapper.toDomain(updatedData);
  }

  async delete(id: string): Promise<void> {
    const snapshot = await this.tasksRef.where('id', '==', id).limit(1).get();

    if (snapshot.empty) return;

    const [doc] = snapshot.docs;
    await doc.ref.delete();
  }
}
