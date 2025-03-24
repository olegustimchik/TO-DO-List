import "reflect-metadata";
import { AllExceptionFilter } from "@/core/filters/all-exception.filter";
import { ValidationPipe }     from "@nestjs/common";
import { NestFactory }        from "@nestjs/core";
import * as dotenv            from "dotenv";
import { AppModule }          from "src/app.module";
import { AuthGuard } from "./main/quards/auth.quard";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalFilters(new AllExceptionFilter());
  dotenv.config();
  // app.use(bodyParser.json({ limit: "50mb" }));
  // app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin     : process.env.CORS_ORIGINS,
    methods    : "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  await app.listen(+(process.env.PORT || 8000));
}

bootstrap();
