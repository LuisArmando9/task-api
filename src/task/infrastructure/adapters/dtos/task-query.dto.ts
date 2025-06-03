// get-tasks-query.dto.ts

import { IsOptional, IsString, IsEnum, IsBoolean, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStatus, TaskPriority } from 'src/task/core/domain/enums/task-status.enum';

export class GetTasksQueryDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(10)
  limit: number;

  @IsOptional()
  @IsString()
  cursor?: string | null;
}
