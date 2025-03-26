import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException, UseGuards, ForbiddenException } from "@nestjs/common";

import { TaskToRequestData }                                                    from "@/main/data-mappers/tasks.data-mapper";
import { ChangeStatus, TaskCreate, TaskGet, TaskUpdate }                                      from "@/main/dtos/task.dto";
import { TaskService }                                                          from "@/main/services/task.service";
import { TaskRequest }                                                          from "@/main/types/requests-data";
import { AuthGuard } from "@/main/quards/auth.quard";
import { UserListService } from "../services/user-list.service";
import { UserData } from "@/core/abstracts/custom-decorators";
import { UserRoles } from "../enums/user-roles";

@Controller("tasks")
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService, private readonly taskDataMapper: TaskToRequestData, private readonly userListService: UserListService) {}

  @Post("/")
  async create(@Body() createTaskDto: TaskCreate, @UserData() userData: any): Promise<TaskRequest> {
    const userList = await this.userListService.getUserRoleInList(userData.id, createTaskDto.listId);
    if (userList.role !== UserRoles.EDITOR && userList.role !== UserRoles.OWNER){ 
      throw new ForbiddenException("You don't have permissions to create new tasks"); 
    }
    const newTask = await this.taskService.createTask(createTaskDto.name, createTaskDto.listId, createTaskDto.description);
    return this.taskDataMapper.toRequestItem(newTask, userList.role);
  }

  @Get("/:id")
  async findOne(@Param() params: TaskGet, @UserData() userData: any): Promise<TaskRequest> {
    const tasks = await this.taskService.getTaskById(params.id);
    if (!tasks) {
      throw new BadRequestException("Task not found");
    }
    const userList = await this.userListService.getUserRoleInList(userData.id, tasks.list.id);
    if(!userList){ 
      throw new ForbiddenException("You can't get this tasks")
    }
    return this.taskDataMapper.toRequestItem(tasks, userList.role) ;
  }

  @Put("/:id")
  async update(@Param() params: TaskGet, @Body() updateTaskDto: TaskUpdate, @UserData() userData: any): Promise<TaskRequest>  {
    const task = await this.taskService.getTaskById(params.id);
    if (!task) {
      throw new BadRequestException("Task not found");
    }
    const userList = await this.userListService.getUserRoleInList(userData.id, task.list.id);
    if (userList.role !== UserRoles.EDITOR && userList.role !== UserRoles.OWNER){ 
      throw new ForbiddenException("You don't have permissions to edit this task"); 
    }

    task.name = updateTaskDto.name;
    task.description = updateTaskDto.description;
    task.completed = updateTaskDto.completed;
    const newTask = await this.taskService.saveTask(task);

    return this.taskDataMapper.toRequestItem(newTask, userList.role);
  }

  @Put("/change-status/:id")
  async changeStatus(@Param() params: TaskGet, @Body() updateTaskDto: ChangeStatus, @UserData() userData: any): Promise<TaskRequest>  {
    const task = await this.taskService.getTaskById(params.id);
    if (!task) {
      throw new BadRequestException("Task not found");
    }
    const userList = await this.userListService.getUserRoleInList(userData.id, task.list.id);
    if (!userList){ 
      throw new ForbiddenException("You don't have permissions to edit this task"); 
    }

    task.completed = updateTaskDto.completed;
    const newTask = await this.taskService.saveTask(task);

    return this.taskDataMapper.toRequestItem(newTask, userList.role);
  }


  @Delete("/:id")
  async remove(@Param() params: TaskGet, @UserData() userData: any): Promise<{id: string}> {
    const task = await this.taskService.getTaskById(params.id);
    if (!task) {
      throw new BadRequestException("Task not found");
    }
    const userList = await this.userListService.getUserRoleInList(userData.id, task.list.id);
    if (userList.role !== UserRoles.EDITOR && userList.role !== UserRoles.OWNER){ 
      throw new ForbiddenException("You don't have permissions to delete this task"); 
    }
    const isDeleted = await this.taskService.deleteTask(params.id);
    if (!isDeleted) {
      throw new BadRequestException("Cannot delete this task");
    }

    return { id: params.id };
  }
}
