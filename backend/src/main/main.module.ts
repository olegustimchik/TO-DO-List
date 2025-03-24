import { UserController } from "@/main/controllers/user.controller";
import { UserEntity }     from "@/main/entities/user.entity";
import { Module }         from "@nestjs/common";
import { JwtModule }      from "@nestjs/jwt";
import { TypeOrmModule }  from "@nestjs/typeorm";

import { ConfigService} from "@nestjs/config";
import { HashService }    from "./services/hash.service";
import { UserService }    from "./services/user.service";
import { ListsEntity } from "./entities/lists.entity";
import { TasksEntity } from "./entities/tasks.entity";
import { ListService } from "./services/list.service";
import { ListController } from "./controllers/list.controller";

@Module({
  imports: [ JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => {
      return {
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: '1h' },
      };
    },
    inject: [ConfigService],
  }), TypeOrmModule.forFeature([UserEntity, ListsEntity, TasksEntity])],
  controllers: [UserController, ListController],
  providers  : [UserService, HashService, ListService],
})
export class MainModule {}
