import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: 'TCP',
    options: {
      port: envs.PORT,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen();
  logger.log(`Products MS is running on http://localhost:${envs.PORT}`);
}
bootstrap();
