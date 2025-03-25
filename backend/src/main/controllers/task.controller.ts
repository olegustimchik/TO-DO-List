import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from "@nestjs/common";

import { TaskCreate, TaskGet, TaskUpdate }                                      from "../dtos/task.dto";
import { TaskService }                                                          from "../services/task.service";
import { TaskRequest }                                                          from "../types/requests-data";
import { TaskToRequestData } from "../data-mappers/tasks.data-mapper";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService, private readonly taskDataMapper: TaskToRequestData ) {}

  @Post("/")
  async create(@Body() createTaskDto: TaskCreate): Promise<TaskRequest> {
    return await this.taskService.createTask(createTaskDto.name, createTaskDto.listId, createTaskDto.description);
  }

  @Get("/:id")
  async findOne(@Param() params: TaskGet): Promise<TaskRequest> {
    const tasks = await this.taskService.getTaskById(params.id);
    if (!tasks) {
      throw new BadRequestException("Task not found");
    }

    return tasks ;
  }

  @Put("/:id")
  async update(@Param() params: TaskGet, @Body() updateTaskDto: TaskUpdate): Promise<TaskRequest>  {
    const task = await this.taskService.getTaskById(params.id);
    if (!task) {
      throw new BadRequestException("Task not found");
    }

    task.name = updateTaskDto.name;
    task.description = updateTaskDto.description;
    task.completed = updateTaskDto.completed;
    const newTask = await this.taskService.saveTask(task);
    console.log(newTask);
    return this.taskDataMapper.toRequestItem(newTask);
  }

  @Delete("/:id")
  async remove(@Param() params: TaskGet): Promise<{id: string}> {
    const isDeleted = await this.taskService.deleteTask(params.id);
    if (!isDeleted) {
      throw new BadRequestException("Cannot delete this task");
    }

    return { id: params.id };
  }
}
