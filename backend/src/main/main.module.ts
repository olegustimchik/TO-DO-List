import { ListController }    from "@/main/controllers/list.controller";
import { TaskController }    from "@/main/controllers/task.controller";
import { UserController }    from "@/main/controllers/user.controller";
import { ListToRequestData } from "@/main/data-mappers/list.data-mapper";
import { TaskToRequestData } from "@/main/data-mappers/tasks.data-mapper";
import { ListsEntity }       from "@/main/entities/lists.entity";
import { TasksEntity }       from "@/main/entities/tasks.entity";
import { UserEntity }        from "@/main/entities/user.entity";
import { HashService }       from "@/main/services/hash.service";
import { ListService }       from "@/main/services/list.service";
import { TaskService }       from "@/main/services/task.service";
import { UserService }       from "@/main/services/user.service";
import { Module }            from "@nestjs/common";
import { ConfigService }     from "@nestjs/config";
import { JwtModule }         from "@nestjs/jwt";
import { TypeOrmModule }     from "@nestjs/typeorm";

import { UserListEntity }    from "@/main/entities/user-list.entity";
import { UserListService } from "@/main/services/user-list.service";

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => {
      return {
        secret     : configService.get<string>("SECRET"),
        signOptions: { expiresIn: "1h" },
      };
    },
    inject: [ConfigService],
  }), TypeOrmModule.forFeature([UserEntity, ListsEntity, TasksEntity, UserListEntity])],
  controllers: [UserController, ListController, TaskController],
  providers  : [UserService, HashService, ListService, ListToRequestData, TaskService, TaskToRequestData, UserListService],
})
export class MainModule {}
