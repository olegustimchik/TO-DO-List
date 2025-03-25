import { UserData }                                                                               from "@/core/abstracts/custom-decorators";
import { ListToRequestData }                                                                      from "@/main/data-mappers/list.data-mapper";
import { ListCreate, ListDelete, ListGet, ListGetAll, ListUpdate }                                from "@/main/dtos/lists.dto";
import { TaskCreate }                                                                             from "@/main/dtos/task.dto";
import { AuthGuard }                                                                              from "@/main/quards/auth.quard";
import { ListService }                                                                            from "@/main/services/list.service";
import { TaskService }                                                                            from "@/main/services/task.service";
import { UserService }                                                                            from "@/main/services/user.service";
import { ListRequest, TaskRequest }                                                               from "@/main/types/requests-data";
import { Controller, Post, Body, BadRequestException, UseGuards, Query, Delete, Param, Get, Put } from "@nestjs/common";

import { TaskToRequestData }                                                                      from "../data-mappers/tasks.data-mapper";

@Controller("list")
@UseGuards(AuthGuard)
export class ListController {
  constructor(private readonly listService: ListService, private readonly listDataMapper: ListToRequestData, private readonly taskService: TaskService, private readonly taskDataMapper: TaskToRequestData) { }

  @Post("/")
  async createList(@Body() body: ListCreate, @UserData() userData: any): Promise<ListRequest> {
    const list = await this.listService.createList(body.name, userData.id);

    return this.listDataMapper.toRequestItem(list);
  }

  @Get("/all")
  async getAllLists(@Query() params: ListGetAll, @UserData() userData: any): Promise<{ data: Array<ListRequest>, total: number}> {
    const lists = await this.listService.getListsByUserId(userData.id, params.take, params.skip);
    const total = await this.listService.getListsCount(userData.id);

    return { data: lists.map(item => this.listDataMapper.toRequestItem(item)), total };
  }

  @Delete("/:id")
  async deleteList(@Param() params: ListDelete, @UserData() userData: any): Promise<{id: string}> {
    const list = await this.listService.getListById(params.id);
    if (!list) {
      throw new BadRequestException("List not found");
    }
    const isDeleted = await this.listService.deleteList(params.id);
    if (!isDeleted) {
      throw new BadRequestException("List not deleted");
    }

    return { id: list.id };
  }

  @Get("/:id")
  async getList(@Param() params: ListGet, @UserData() userData: any): Promise<ListRequest> {
    const list = await this.listService.getListById(params.id);
    if (!list) {
      throw new BadRequestException("List not found");
    }

    return this.listDataMapper.toRequestItem(list);
  }

  @Put("/:id")
  async updateList(@Param() params: ListGet, @Body() body: ListUpdate, @UserData() userData: any): Promise<ListRequest> {
    const list = await this.listService.getListById(params.id);
    if (!list) {
      throw new BadRequestException("List not found");
    }
    list.name = body.name;
    const updatedList = await this.listService.saveList(list);

    return this.listDataMapper.toRequestItem(updatedList);
  }

  @Post("/:id/add-task")
  async addTaskToList(@Param() params: ListGet, @Body() body: TaskCreate, @UserData() userData: any): Promise<TaskRequest> {
    const list = await this.listService.getListById(params.id);
    if (!list) {
      throw new BadRequestException("List not found");
    }
    const task = await this.taskService.createTask(body.name, list.id, body.description);
    list.tasks.push(task);
    const updatedList = await this.listService.saveList(list);

    return this.taskDataMapper.toRequestItem(task);
  }

  @Get("/:id/tasks")
  async getTasksFromList(@Param() params: ListGet, @UserData() userData: any, @Query() query: ListGetAll): Promise<{ data: Array<TaskRequest>, total: number}> {
    const list = await this.listService.getListById(params.id);
    if (!list) {
      throw new BadRequestException("List not found");
    }
    const tasks = await this.taskService.getTasksByListId(list.id, query.take, query.skip);
    const total = await this.taskService.getTasksCount(list.id);

    return { data: tasks, total };
  }
}
