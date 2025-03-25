import { TasksEntity }      from "@/main/entities/tasks.entity";
import { Injectable }       from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository }       from "typeorm";

@Injectable()
export class TaskService {
  constructor(@InjectRepository(TasksEntity) private readonly taskRepository: Repository<TasksEntity>) { }

  public async createTask(name: string, listId: string, description: string): Promise<TasksEntity> {
    return await this.taskRepository.save({
      name, listId, description,
    });
  }

  public async getTasksByListId(listId: string, take: number, skip: number): Promise<Array<TasksEntity>> {
    return await this.taskRepository.find({
      where: { list: { id: listId } }, take, skip, order: { createdAt: "DESC" },
    });
  }

  public async getTasksCount(listId: string): Promise<number> {
    return await this.taskRepository.count({ where: { list: { id: listId } } });
  }

  public async getTaskById(id: string): Promise<TasksEntity> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  public async saveTask(task: TasksEntity): Promise<TasksEntity> {
    return await this.taskRepository.save(task);
  }

  public async deleteTask(id: string): Promise<boolean> {
    const task = await this.taskRepository.delete({ id });

    return !!task.affected;
  }
}
