// src/libs/interfaces/app-config.interface.ts

export interface IAppConfig {
  ENV: string;
  DATABASE_URL: string;
  APP_NAME: string;
  APP_VERSION: string;
  COMPANY_NAME: string;
  PORT: number;
  ENABLE_CONSOLE_LOG: boolean;
  ENABLE_SWAGGER: boolean;
  CORS_ORIGIN: string;
  API_URL: string;
  JWT: {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;
  };
}
