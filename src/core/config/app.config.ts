// src/core/config/app.config.ts
import { registerAs } from '@nestjs/config';
import type { IAppConfig } from '@spendo/interfaces/app-config.interface';

/**
 * Application Configuration Namespace
 * Access via: configService.get('app.APP_NAME')
 */
export default registerAs(
  'config',
  (): IAppConfig => ({
    ENV: process.env.NODE_ENV || 'development',

    // Database
    DATABASE_URL: process.env.DATABASE_URL || '',

    // App Metadata
    APP_NAME: process.env.APP_NAME || 'Spendo APIs',
    APP_VERSION: process.env.APP_VERSION || '1.0.0',
    COMPANY_NAME: process.env.COMPANY_NAME || 'Spendo Corp',

    // Server
    PORT: parseInt(process.env.PORT || '3000', 10),

    // Feature Toggles
    ENABLE_CONSOLE_LOG: process.env.ENABLE_CONSOLE_LOG === 'true',
    ENABLE_SWAGGER: process.env.ENABLE_SWAGGER === 'true',

    // Network
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
    API_URL: process.env.API_URL || 'https://api.spendo.com',

    // JWT
    JWT: {
      JWT_SECRET: process.env.JWT_SECRET || 'defaultSecret',
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
      JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
  }),
);
