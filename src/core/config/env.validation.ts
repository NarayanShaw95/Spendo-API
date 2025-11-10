// src/core/config/env.validation.ts
import * as Joi from 'joi';

/**
 * Environment Variable Validation Schema
 * Ensures all required .env values are present and valid before app startup.
 */
export const envValidationSchema = Joi.object({
  // Application Environment
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  // Server Configuration
  PORT: Joi.number().default(3000),
  // Database Configuration
  DATABASE_URL: Joi.string().uri().required(),
  // Application Metadata
  APP_NAME: Joi.string().default('Spendo APIs'),
  APP_VERSION: Joi.string().default('1.0.0'),
  COMPANY_NAME: Joi.string().default('Spendo Corp'),
  // Feature Toggles
  ENABLE_CONSOLE_LOG: Joi.boolean().truthy('true').falsy('false').default(true),
  ENABLE_SWAGGER: Joi.boolean().truthy('true').falsy('false').default(true),
  // Network & Security
  CORS_ORIGIN: Joi.string().default('*'),
  API_URL: Joi.string().uri().allow('').default('https://api.spendo.com'),
});
