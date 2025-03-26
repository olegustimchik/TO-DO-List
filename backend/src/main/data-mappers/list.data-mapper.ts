import { Injectable }  from "@nestjs/common";
import { UserListEntity } from "../entities/user-list.entity";
import { ListsEntity } from "../entities/lists.entity";
import { ListRequest } from "../types/requests-data";

@Injectable()
export class ListToRequestData {
  constructor() { }

  toRequestItem(data: UserListEntity): ListRequest {
    return {

      id  : data.list.id,
      createdAt: data.list.createdAt,
      name: data.list.name,
      role: data.role,

    };
  }
}
