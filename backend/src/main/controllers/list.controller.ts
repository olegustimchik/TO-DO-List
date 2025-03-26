import { UserData }                                                                               from "@/core/abstracts/custom-decorators";
import { ListToRequestData }                                                                      from "@/main/data-mappers/list.data-mapper";
import { addNewUser, ListCreate, ListDelete, ListGet, ListGetAll, ListUpdate }                                from "@/main/dtos/lists.dto";
import { TaskCreate }                                                                             from "@/main/dtos/task.dto";
import { AuthGuard }                                                                              from "@/main/quards/auth.quard";
import { ListService }                                                                            from "@/main/services/list.service";
import { TaskService }                                                                            from "@/main/services/task.service";
import { UserService }                                                                            from "@/main/services/user.service";
import { ListRequest, TaskRequest }                                                               from "@/main/types/requests-data";
import { Controller, Post, Body, BadRequestException, UseGuards, Query, Delete, Param, Get, Put, ForbiddenException } from "@nestjs/common";

import { TaskToRequestData }                                                                      from "../data-mappers/tasks.data-mapper";
import { UserListService } from "../services/user-list.service";
import { UserRoles } from "../enums/user-roles";
import { ListRoleAccessGuard } from "../quards/list.guard";

@Controller("list")
@UseGuards(AuthGuard)
export class ListController {
  constructor(private readonly userService: UserService, private readonly listService: ListService, private readonly listDataMapper: ListToRequestData, private readonly taskService: TaskService, private readonly taskDataMapper: TaskToRequestData, private readonly userListService: UserListService) { }

  @Post("/")
  async createList(@Body() body: ListCreate, @UserData() userData: any): Promise<ListRequest> {
    const list = await this.listService.createList(body.name);
    const user = await this.userService.getUserById(userData.id)
    const userList = await this.userListService.saveUserList(user, list, UserRoles.OWNER); 

    return this.listDataMapper.toRequestItem(userList);
  }

  @Get("/all")
  async getAllLists(@Query() params: ListGetAll, @UserData() userData: any): Promise<{ data: Array<ListRequest>, total: number}> {
    const lists = await this.userListService.getListsForUser(userData.id, params.take, params.skip);
    const total = await this.userListService.getListTotalForUser(userData.id);

    return { data: lists.map(item => this.listDataMapper.toRequestItem(item)), total };
  }

  @Delete("/:id")
  @UseGuards(ListRoleAccessGuard)
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
    const list = await this.userListService.getUserRoleInList(userData.id, params.id);
    if (!list) {
      throw new BadRequestException("List not found");
    }

    return this.listDataMapper.toRequestItem(list);
  }

  @Put("/:id")
  @UseGuards(ListRoleAccessGuard)
  async updateList(@Param() params: ListGet, @Body() body: ListUpdate, @UserData() userData: any): Promise<ListRequest> {
    const userList = await this.userListService.getUserRoleInList(userData.id, params.id);
    const list = await this.listService.getListById(params.id);
    list.name = body.name;
    const updatedList = await this.listService.saveList(list);
    if(!updatedList){ 
      throw new BadRequestException("Can't update this list");
    }

    userList.list = updatedList; 
    return this.listDataMapper.toRequestItem(userList);
  }

  @Post("/:id/add-task")
  @UseGuards(ListRoleAccessGuard)
  async addTaskToList(@Param() params: ListGet, @Body() body: TaskCreate, @UserData() userData: any): Promise<TaskRequest> {
    const userList = await this.userListService.getUserRoleInList(userData.id, params.id);
    const list = userList.list; 
    const task = await this.taskService.createTask(body.name, userList.list.id, body.description);
    list.tasks.push(task);
    await this.listService.saveList(list);

    return this.taskDataMapper.toRequestItem(task, userList.role);
  }

  @Get("/:id/tasks")
  async getTasksFromList(@Param() params: ListGet, @UserData() userData: any, @Query() query: ListGetAll): Promise<{ data: Array<TaskRequest>, total: number}> {
    const userList = await this.userListService.getUserRoleInList(userData.id, params.id);
    const list = userList.list;
    const tasks = await this.taskService.getTasksByListId(list.id, query.take, query.skip);
    const total = await this.taskService.getTasksCount(list.id);
    const data = tasks.map(item => this.taskDataMapper.toRequestItem(item, userList.role))

    return { data, total };
  }

  @Post("/:id/add-user")
  @UseGuards(ListRoleAccessGuard)
  async addUserToList(@Param() params: ListGet, @Body() body: addNewUser, @UserData() userData: any): Promise<{message: string}> {
    const userList = await this.userListService.getUserRoleInList(userData.id, params.id);
    console.log(body);
    if(userList.role !== UserRoles.OWNER){ 
      throw new ForbiddenException("Only owner can add new users"); 
    }

    const user = await this.userService.getUserByEmail(body.email);
    if(!user){ 
      throw new BadRequestException("This user doesn't exist");
    }
    const newListUser = await this.userListService.saveUserList(user, userList.list, body.role);
    return { message: "user successfully added to this list"}; 
  }
}
