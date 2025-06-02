import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTaskDto, UpdateTaskDto, TaskDto } from "../dtos/task-dto";
import { CreateTaskUsecase } from "src/task/core/domain/usecase/create-task-usecase";
import { DeleteTaskUsecase } from "src/task/core/domain/usecase/delete-task-usecase";
import { GetTaskUsecase } from "src/task/core/domain/usecase/get-task-usecase";
import { UpdateTaskUsecase } from "src/task/core/domain/usecase/update-task-usecase";
import { JwtAuthGuard } from "src/auth/infrastructure/adapters/guards/jwt.guard";
import { Request } from "express";

@Controller('api/v1/tasks')
@ApiTags('tasks')
export class TaskController {
    constructor(private readonly createTaskUsecase: CreateTaskUsecase,
        private readonly getTaskUsecase: GetTaskUsecase,
        private readonly updateTaskUsecase: UpdateTaskUsecase,
        private readonly deleteTaskUsecase: DeleteTaskUsecase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: TaskDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBody({ type: CreateTaskDto })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTaskDto: CreateTaskDto,  @Req() req: any) {
        const userId = req?.user?.userId ?? '';
        const user = createTaskDto.toDomain();
        user.userId = userId;
        Logger.log('CREATE TASK', userId);
        return this.createTaskUsecase.create(user);
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get a task by ID' })
    @ApiResponse({ status: 200, description: 'The task has been successfully retrieved.', type: TaskDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    getById(@Param('id') id: string) {
        return this.getTaskUsecase.getById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a task by ID' })
    @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: TaskDto })
    @ApiResponse({ status: 404, description: 'Task not found' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: UpdateTaskDto })
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.updateTaskUsecase.update(id, updateTaskDto.toDomain());
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a task by ID' })
    @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Task not found' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    delete(@Param('id') id: string) {
        return this.deleteTaskUsecase.delete(id);
    }

}