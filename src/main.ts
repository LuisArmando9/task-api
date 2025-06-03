import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiFailedResponseFilter } from './core/filters/infrastructure/api-failed-response.filter';
import { ResponseInterceptor } from './core/interceptor/infraestructure/api-response.interceptor';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';
import express from 'express';

const server = express();

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('Documentación de la API con Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  app.useGlobalFilters(new ApiFailedResponseFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

