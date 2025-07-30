import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "https://tcg-world-ui.vercel.app",
      "http://localhost:3000",
      "https://tcg-world-ui-env-dev-tcg-world-d1b60ad9.vercel.app",
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  await app.listen(process.env.PORT || 3000, "0.0.0.0");
}
bootstrap();
