import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

(async function () {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(configuration().PORT);
})();
