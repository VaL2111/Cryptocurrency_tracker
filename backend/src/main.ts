import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port: number =
    configService.get<number>("port") || Number(process.env.PORT) || 3000;

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://crypto-tracker-client.onrender.com",
      process.env.FRONTEND_URL || "",
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("This api for labs")
    .setVersion("1.0")
    .addTag("API")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port, "0.0.0.0");
}
bootstrap();
