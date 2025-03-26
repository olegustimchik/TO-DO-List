import { ListsEntity }      from "@/main/entities/lists.entity";
import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";

@Injectable()
export class ListService {
  constructor(@InjectRepository(ListsEntity) private readonly listRepository: Repository<ListsEntity>) { }

  public async createList(name: string): Promise<ListsEntity> {
    return await this.listRepository.save({ name });
  }

  public async getListsByUserId(userId: string, take: number, skip: number): Promise<Array<ListsEntity>> {
    return await this.listRepository.find({
      where: { usersLists: { user: { id: userId } } }, take, skip, order: { createdAt: "DESC" },
    });
  }

  public async getListsCount(userId: string): Promise<number> {
    return await this.listRepository.count({ where: { usersLists: { user: { id: userId } } } });
  }

  public async getListById(id: string): Promise<ListsEntity> {
    return await this.listRepository.findOne({ where: { id } });
  }

  public async saveList(list: ListsEntity): Promise<ListsEntity> {
    return await this.listRepository.save(list);
  }

  public async deleteList(id: string): Promise<boolean> {
    const list = await this.listRepository.delete({ id });

    return !!list.affected;
  }
}
