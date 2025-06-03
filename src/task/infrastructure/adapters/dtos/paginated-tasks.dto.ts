// paginated-tasks.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { TaskModel } from 'src/task/core/domain/models/task-model';

export class PaginatedTasksDto {
  @ApiProperty({
    description: 'List of tasks in the current page',
    type: [TaskModel],
  })
  items: TaskModel[];

  @ApiProperty({
    description: 'Cursor string to retrieve the next page of results',
    type: String,
    nullable: true,
    example: 'last-task-id-123',
  })
  nextCursor: string | null;

}
