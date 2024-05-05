import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Allow all origins
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
