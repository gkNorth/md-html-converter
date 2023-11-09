import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const env = process.env.NODE_ENV || 'production';
  // if (env === 'develop') {
  //   app.enableCors();
  // }
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  await app.listen(8000);
}
bootstrap();
