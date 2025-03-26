import { TasksEntity } from "@/main/entities/tasks.entity";
import { TaskRequest } from "@/main/types/requests-data";
import { Injectable }  from "@nestjs/common";

@Injectable()
export class TaskToRequestData {
  constructor() { }
  toRequestItem(data: TasksEntity, role: string): TaskRequest {
    return {
      id         : data.id,
      name       : data.name,
      description: data.description,
      completed  : data.completed,
      createdAt  : data.createdAt,
      role       ,
    };
  }
}
