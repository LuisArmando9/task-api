import { ApiHideProperty, ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsArray,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import {
  TaskStatus,
  TaskPriority,
} from 'src/task/core/domain/enums/task-status.enum';
import { TaskModel } from 'src/task/core/domain/models/task-model';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Implement authentication',
    description: 'Title of the task',
  })
  @IsString()
  title: string;


  @ApiPropertyOptional({
    example: 'Use JWT for user login sessions',
    description: 'Detailed description of the task',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.CANCELLED,
    description: 'Current status of the task',
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.HIGH,
    description: 'Priority level of the task',
  })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiPropertyOptional({
    example: '2025-06-30T23:59:59Z',
    description: 'Deadline for the task (ISO format)',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    example: ['backend', 'auth'],
    description: 'Tags associated with the task',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    example: false,
    description: 'Whether the task is archived',
  })
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;

  toDomain(): TaskModel {
    return Object.assign(new TaskModel(), this);
  }
}

export class UpdateTaskDto implements Partial<Omit<CreateTaskDto, 'toDomain'>> {
  @ApiPropertyOptional({ example: 'Update Swagger docs' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Add examples to DTOs' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.IN_PROGRESS })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority, example: TaskPriority.MEDIUM })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({ example: '2025-07-15T12:00:00Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    example: ['swagger', 'documentation'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;

  toDomain(): TaskModel {
    const { toDomain, ...data } = this;
    return Object.assign(new TaskModel(), data);
  }
}

export class TaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: '9b2d32c7-a843-4a3b-bbbb-0a67adfd93ec' })
  @IsUUID()
  creatorId: string;
}
