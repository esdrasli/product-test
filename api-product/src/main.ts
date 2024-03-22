import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');
import { CorsMiddleware } from '../middleware/cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
