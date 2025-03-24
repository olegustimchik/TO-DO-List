import { ListsEntity }       from "@/main/entities/lists.entity";
import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository }       from "typeorm";
import { TasksEntity } from "../entities/tasks.entity";

@Injectable()
export class ListService {
    constructor(@InjectRepository(ListsEntity) private readonly listRepository: Repository<ListsEntity>) { }
        
    public async createList(name: string, userId: string): Promise<ListsEntity> {
        return await this.listRepository.save({
            name, userId,
        });
    }

    public async getListsByUserId(userId: string, take: number, skip: number): Promise<ListsEntity[]> {
        return await this.listRepository.find({ where: { user: {id: userId} }, take, skip , order: { createdAt: "DESC" } });
    }

    public async getListById(id: string): Promise<ListsEntity> {
        return await this.listRepository.findOne({ where: { id } });
    }

    public async saveList(list: ListsEntity): Promise<ListsEntity> {
        return await this.listRepository.save(list);
    }
}
