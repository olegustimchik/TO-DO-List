import { AppService }    from "@/app.service";
import { MainModule }    from "@/main/main.module";
import { Module }        from "@nestjs/common";
import { ConfigModule }  from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type            : "postgres",
      database        : process.env.DATABASE_NAME,
      host            : process.env.DATABASE_HOST,
      username        : process.env.DATABASE_USER,
      password        : process.env.DATABASE_PASSWORD,
      port            : process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 3300,
      schema          : "public",
      autoLoadEntities: true,
      synchronize     : false,
      migrationsRun   : false,
      logging         : false,
      entities        : [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations      : [`${__dirname}/**/migrations/*{.js,.ts}`],
    }), MainModule],
  controllers: [],
  providers  : [AppService],
})
export class AppModule {}
