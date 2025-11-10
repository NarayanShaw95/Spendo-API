// src/app/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from '@spendo/logger/app.logger';
import type { IAppConfig } from '@spendo/interfaces/app-config.interface';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Get and strongly type config
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('config');

  if (!appConfig) {
    throw new Error(
      '❌ App configuration not loaded. Check config registration.',
    );
  }

  // Global App Logger
  const logger = app.get(AppLogger);
  app.useLogger(logger);

  // Security Middlewares
  app.use(helmet());
  app.enableCors({
    origin: appConfig.CORS_ORIGIN.split(','),
    credentials: true,
  });

  // Global Prefix and Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip extra fields
      forbidNonWhitelisted: true, // Throw error if unknown fields sent
      transform: true, // Transform payloads to DTO classes
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  /**
   * Swagger API Docs (conditional)
   */
  if (appConfig.ENABLE_SWAGGER) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(appConfig.APP_NAME)
      .setDescription(
        `REST API backend for ${appConfig.COMPANY_NAME}.  
        Use **Bearer <token>** in the Authorization header.`,
      )
      .setVersion(appConfig.APP_VERSION)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
        },
        'access-token',
      )
      .addServer(`http://localhost:${appConfig.PORT}`, 'Local Development')
      .addServer(appConfig.API_URL, 'Production Server')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true, // Keep bearer token after reload
        displayRequestDuration: true,
      },
      customSiteTitle: `${appConfig.APP_NAME} Docs`,
    });
  }

  // Start Server
  await app.listen(appConfig.PORT);

  if (appConfig.ENABLE_CONSOLE_LOG) {
    console.log(
      `🚀 ${appConfig.APP_NAME} running on http://localhost:${appConfig.PORT}`,
    );
    if (appConfig.ENABLE_SWAGGER)
      console.log(`📄 Swagger Docs: http://localhost:${appConfig.PORT}/docs`);
  }
}
bootstrap().catch((err) => {
  console.error('❌ Failed to start application:', err);
  process.exit(1);
});
