import * as Joi from 'joi';

export function validateEnv(config: Record<string, unknown>) {
  const schema = Joi.object({
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
  });

  const { error, value } = schema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });
  if (error) throw new Error(`Config validation error: ${error.message}`);
  return value;
}
