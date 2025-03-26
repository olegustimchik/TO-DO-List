import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";

import { ListsEntity }      from "../entities/lists.entity";
import { UserListEntity }   from "../entities/user-list.entity";
import { UserEntity }       from "../entities/user.entity";
import { UserRoles }        from "../enums/user-roles";

@Injectable()
export class UserListService {
  constructor(@InjectRepository(UserListEntity) private readonly userListRepository: Repository<UserListEntity>) {}

  async saveUserList(user: UserEntity, list: ListsEntity, role: UserRoles): Promise<UserListEntity> {
    const userList = this.userListRepository.create({
      user, list, role,
    });

    return this.userListRepository.save(userList);
  }

  async getListTotalForUser(userId: string): Promise<number> {
    return await this.userListRepository.count({
        where    : { user: { id: userId } }});
    

  }
  async getListsForUser(userId: string, take: number, skip: number): Promise<Array<UserListEntity>> {
    const userLists = await this.userListRepository.find({
      where    : { user: { id: userId } },
      relations: ["list"],
      take, 
      skip, 
      order: { list: { createdAt: "DESC"}}
    });

    return userLists;
  }

  async getUserRoleInList(userId: string, listId: string): Promise<UserListEntity> {
    const userList = await this.userListRepository.findOne({ where: { user: { id: userId }, list: { id: listId } }, relations: ["list"] });

    return userList;
  }

  async removeUserFromList(userId: string, listId: string): Promise<boolean> {
    const result = await this.userListRepository.delete({
      user: { id: userId },
      list: { id: listId },
    });

    return result.affected > 0;
  }

  async updateUserRole(userList: UserListEntity): Promise<UserListEntity> {
    return this.userListRepository.save(userList);
  }
}
