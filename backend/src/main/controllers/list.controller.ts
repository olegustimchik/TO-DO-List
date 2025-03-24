import { Controller, Post, Body, BadRequestException, UseGuards, UnauthorizedException, Query } from "@nestjs/common";
import { ListService } from "../services/list.service";
import { UserService } from "../services/user.service";
import { ListCreate, ListGetAll } from "../dtos/lists.dto";
import { AuthGuard } from "../quards/auth.quard";
import { UserData } from "@/core/abstracts/custom-decorators";
import { ListsEntity } from "../entities/lists.entity";


@Controller("list")
@UseGuards(AuthGuard)
export class ListController { 
    constructor(private readonly listService: ListService, private readonly userService: UserService ) { }
        
    @Post("/")
    async createList(@Body() body: ListCreate, @UserData() userData: any): Promise<ListsEntity> {
        const user = await this.userService.getUserById(userData.id)
        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        return this.listService.createList(body.name, user.id);
    }

    @Post("/all")
    async getAllLists(@Query() params: ListGetAll ,@UserData() userData: any): Promise<ListsEntity[]> {
        const user = await this.userService.getUserById(userData.id)
        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        return this.listService.getListsByUserId(user.id, params.take, params.skip);
    }
}